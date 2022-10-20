/**
 * DismissedActivationTooltip.
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
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import {
	AdminMenuTooltip,
	useTooltipState,
} from '../../../../../components/AdminMenuTooltip';
import { ACTIVATION_ACKNOWLEDGEMENT_TOOLTIP_STATE_KEY } from '../../../constants';

export default function DismissedActivationTooltip() {
	const { isTooltipVisible } = useTooltipState(
		ACTIVATION_ACKNOWLEDGEMENT_TOOLTIP_STATE_KEY
	);

	if ( ! isTooltipVisible ) {
		return null;
	}

	return (
		<AdminMenuTooltip
			title={ __(
				'You can connect Google Analytics 4 later here',
				'google-site-kit'
			) }
			content={ __(
				'You can configure the Google Analytics 4 property inside the Site Kit Settings later.',
				'google-site-kit'
			) }
			dismissLabel={ __( 'Got it', 'google-site-kit' ) }
			tooltipStateKey={ ACTIVATION_ACKNOWLEDGEMENT_TOOLTIP_STATE_KEY }
		/>
	);
}
