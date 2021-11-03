/**
 * Analytics-4 Settings controls.
 *
 * Site Kit by Google, Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { useEffect, useState, useCallback } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Data from 'googlesitekit-data';
import { CORE_FORMS } from '../../../../googlesitekit/datastore/forms/constants';
import { MODULES_ANALYTICS_4 } from '../../../analytics-4/datastore/constants';
import { FORM_SETUP, MODULES_ANALYTICS } from '../../datastore/constants';
import { Select, Option } from '../../../../material-components';
import { GA4ActivateSwitch } from '../common';
import {
	PropertySelect,
	UseSnippetSwitch,
} from '../../../analytics-4/components/common';
const { useSelect, useDispatch } = Data;

export default function GA4SettingsControls() {
	const [ matchedProperty, setMatchedProperty ] = useState();

	const accountID = useSelect( ( select ) =>
		select( MODULES_ANALYTICS ).getAccountID()
	);

	// This select is needed to check whether the AdminAPI works or not.
	const properties = useSelect( ( select ) =>
		select( MODULES_ANALYTICS_4 ).getProperties( accountID )
	);

	const isAdminAPIWorking = useSelect( ( select ) =>
		select( MODULES_ANALYTICS_4 ).isAdminAPIWorking()
	);

	const enableGA4 = useSelect( ( select ) =>
		select( CORE_FORMS ).getValue( FORM_SETUP, 'enableGA4' )
	);

	const propertyID = useSelect( ( select ) =>
		select( MODULES_ANALYTICS_4 ).getPropertyID()
	);

	const { matchAccountProperty, setPropertyID } = useDispatch(
		MODULES_ANALYTICS_4
	);

	useEffect( () => {
		setMatchedProperty( undefined );
		if ( Array.isArray( properties ) && isAdminAPIWorking ) {
			matchAccountProperty( accountID ).then( setMatchedProperty );
		}
	}, [
		accountID,
		setMatchedProperty,
		matchAccountProperty,
		properties,
		isAdminAPIWorking,
	] );

	const onActivate = useCallback( () => {
		setPropertyID( matchedProperty?._id );
	}, [ matchedProperty, setPropertyID ] );

	if ( ! isAdminAPIWorking ) {
		return null;
	}

	const isDisabled = ! propertyID && ! enableGA4;

	return (
		<div className="googlesitekit-settings-module__fields-group">
			<div className="googlesitekit-setup-module__inputs">
				{ ! isDisabled && (
					<PropertySelect
						label={ __(
							'Google Analytics 4 Property',
							'google-site-kit'
						) }
					/>
				) }
				{ isDisabled && (
					<Select
						className="googlesitekit-analytics__select-property"
						label={ __(
							'Google Analytics 4 Property',
							'google-site-kit'
						) }
						value={ matchedProperty?._id || '' }
						disabled
						enhanced
						outlined
					>
						<Option value={ matchedProperty?._id || '' }>
							{ ! matchedProperty?._id ||
							! matchedProperty?.displayName
								? ''
								: sprintf(
										/* translators: 1: Property name. 2: Property ID. */
										__( '%1$s (%2$s)', 'google-site-kit' ),
										matchedProperty.displayName,
										matchedProperty._id
								  ) }
						</Option>
					</Select>
				) }
			</div>

			{ isDisabled && <GA4ActivateSwitch onActivate={ onActivate } /> }

			{ ! isDisabled && (
				<div className="googlesitekit-setup-module__inputs googlesitekit-setup-module__inputs--multiline">
					<UseSnippetSwitch />
				</div>
			) }
		</div>
	);
}
