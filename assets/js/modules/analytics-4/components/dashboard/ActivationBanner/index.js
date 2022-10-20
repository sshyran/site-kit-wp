/**
 * ActivationBanner component.
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
 * WordPress dependencies
 */
import { useState, useEffect, Fragment } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { getItem } from '../../../../../googlesitekit/api/cache';
import { GA4_ACTIVATION_BANNER_ID } from '../../../constants';
import DismissedActivationTooltip from './DismissedActivationTooltip';
import MainActivationBanner from './MainActivationBanner';

export default function ActivationBanner() {
	const [ isDismissed, setIsDismissed ] = useState();

	useEffect( () => {
		async function loadPersistentDismissal() {
			const cacheKeyDismissed = `notification::dismissed::${ GA4_ACTIVATION_BANNER_ID }`;
			const { cacheHit } = await getItem( cacheKeyDismissed );
			setIsDismissed( cacheHit );
		}
		loadPersistentDismissal();
	}, [] );

	// Don't render anything until we know the banner is not dismissed.
	if ( isDismissed !== false ) {
		return null;
	}

	return (
		<Fragment>
			<MainActivationBanner />
			<DismissedActivationTooltip />
		</Fragment>
	);
}
