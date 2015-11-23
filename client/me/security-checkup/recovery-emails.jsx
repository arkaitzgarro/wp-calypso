/**
 * External dependencies
 */
import React from 'react';
import assign from 'lodash/object/assign';

/**
 * Internal dependencies
 */
import AccountRecoveryStore from 'lib/security-checkup/account-recovery-store';
import SecurityCheckupActions from 'lib/security-checkup/actions';
import FormSectionHeading from 'components/forms/form-section-heading';
import FormFieldSet from 'components/forms/form-fieldset';
import FormTextInput from 'components/forms/form-text-input';
import FormSettingExplanation from 'components/forms/form-setting-explanation';
import FormButtonsBar from 'components/forms/form-buttons-bar';
import FormButton from 'components/forms/form-button';
import ActionRemove from 'me/action-remove';
import isEmpty from 'lodash/lang/isEmpty';

module.exports = React.createClass( {
	displayName: 'SecurityCheckupRecoveryEmails',

	mixins: [ React.addons.LinkedStateMixin ],

	componentDidMount: function() {
		AccountRecoveryStore.on( 'change', this.refreshRecoveryEmails );
	},

	componentWillUnmount: function() {
		AccountRecoveryStore.off( 'change', this.refreshRecoveryEmails );
	},

	getInitialState: function() {
		return {
			recoveryEmail: '',
			recoveryEmails: [],
			isAddingRecoveryEmail: false
		};
	},

	addEmail: function() {
		this.setState( { isAddingRecoveryEmail: true } );
	},

	saveEmail: function() {
		SecurityCheckupActions.updateEmail( this.state.recoveryEmail );
		this.setState( { isAddingRecoveryEmail: false } );
	},

	cancelEmail: function() {
		this.setState( { isAddingRecoveryEmail: false } );
	},

	refreshRecoveryEmails: function() {
		this.setState( { recoveryEmails: AccountRecoveryStore.getEmails() } );
	},

	renderAddRecoveryEmail: function() {
		return (
			<div>
			</div>
		);
	},

	renderRecoveryEmail: function( recoveryEmail ) {
		return (
			<li>
				{ recoveryEmail }
				<ActionRemove />
			</li>
		);
	},

	renderRecoveryEmails: function() {
		if ( isEmpty( this.state.recoveryEmails ) ) {
			return(
				<div>
					<FormSectionHeading>Recovery emails</FormSectionHeading>
				</div>
			);
		}

		return (
			<div>
				<FormSectionHeading>Recovery emails</FormSectionHeading>
				<ul>
					{ this.state.recoveryEmails.data.emails.map( recoveryEmail => this.renderRecoveryEmail( recoveryEmail ) ) }
				</ul>
			</div>
		);
	},

	renderRecoveryEmailActions: function() {
		if ( this.state.isAddingRecoveryEmail ) {
			return(
				<div>
					<FormFieldSet>
						<FormTextInput valueLink={ this.linkState( 'recoveryEmail' ) } ></FormTextInput>
						<FormSettingExplanation>{ this.translate( 'Your primary email address is {{email/}}', { components: { email: <strong>n.prasath.002@gmail.com</strong> } } ) }</FormSettingExplanation>
					</FormFieldSet>
					<FormButtonsBar>
						<FormButton onClick={ this.saveEmail } >
							{ this.translate( 'Save Email' ) }
						</FormButton>
						<FormButton onClick={ this.cancelEmail }  isPrimary={ false } >
							{ this.translate( 'Cancel' ) }
						</FormButton>
					</FormButtonsBar>
				</div>
			);
		}

		return(
			<FormButton onClick={ this.addEmail } isPrimary={ false } >
				{ this.translate( 'Add Email' ) }
			</FormButton>
		);
	},

	render: function() {
		return (
			<div>
				{ this.renderRecoveryEmails() }
				{ this.renderRecoveryEmailActions() }
			</div>
		);
	}
} );