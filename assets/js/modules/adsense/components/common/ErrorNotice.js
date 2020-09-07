/**
 * AdSense Error Notice component.
 *
 * Site Kit by Google, Copyright 2020 Google LLC
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
import { useCallback } from '@wordpress/element';
import { _x } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { STORE_NAME } from '../../datastore/constants';
import { errorToStatus } from '../../util/status';
import StoreErrorNotice from '../.././../../components/StoreErrorNotice';

export default function ErrorNotice() {
	const shouldDisplayError = useCallback( ( error ) => undefined === errorToStatus( error ), [] );

	return (
		<StoreErrorNotice
			moduleName={ _x( 'AdSense', 'Service name', 'google-site-kit' ) }
			storeName={ STORE_NAME }
			shouldDisplayError={ shouldDisplayError }
		/>
	);
}
