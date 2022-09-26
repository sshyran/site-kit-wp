/**
 * `modules/analytics-4` connection data store
 *
 * Site Kit by Google, Copyright 2022 Google LLC
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
 * Internal dependencies
 */
import Data from 'googlesitekit-data';
import { CORE_MODULES } from '../../../googlesitekit/modules/datastore/constants';
import {
	isValidMeasurementID,
	isValidPropertySelection,
	isValidWebDataStreamID,
} from '../utils/validation';
import { MODULES_ANALYTICS_4 } from './constants';
const { createRegistrySelector } = Data;

export const selectors = {
	/**
	 * Checks if GA4 is connected, pending module data refresh.
	 */
	isFreshlyConnected: createRegistrySelector( ( select ) => ( state ) => {
		// If the module is already connected, it isn't "freshly" connected.
		if ( select( CORE_MODULES ).isModuleConnected( 'analytics-4' ) ) {
			return false;
		}
		// Wait for settings to be available + ensure settings resolver is invoked.
		if (
			undefined === select( MODULES_ANALYTICS_4 ).getSettings() ||
			! state.savedSettings
		) {
			return undefined;
		}
		// "Calculate" the connected state based on saved settings.
		return (
			isValidPropertySelection( state.savedSettings.propertyID ) &&
			isValidWebDataStreamID( state.savedSettings.webDataStreamID ) &&
			isValidMeasurementID( state.savedSettings.measurementID )
		);
	} ),
};

const store = { selectors };

export default store;
