/**
 * GatheringDataNotification component.
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
 * External dependencies
 */
import PropTypes from 'prop-types';
import { useMount } from 'react-use';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useContext, useCallback } from '@wordpress/element';

/**
 * Internal dependencies
 */
import BannerNotification from '../BannerNotification';
import GatheringDataIcon from '../../../../svg/graphics/zero-state-red.svg';
import ViewContextContext from '../../Root/ViewContextContext';
import { getTimeInSeconds, trackEvent } from '../../../util';

export default function GatheringDataNotification( { title } ) {
	const viewContext = useContext( ViewContextContext );
	const eventCategory = `${ viewContext }_gathering-data-notification`;

	useMount( () => {
		trackEvent( eventCategory, 'view_notification' );
	} );

	const handleOnDismiss = useCallback( () => {
		trackEvent( eventCategory, 'dismiss_notification' );
	}, [ eventCategory ] );

	return (
		<BannerNotification
			id="gathering-data-notification"
			title={ title }
			description={ __(
				'It can take up to 48 hours before stats show up for your site. While you’re waiting, connect more services to get more stats.',
				'google-site-kit'
			) }
			format="small"
			dismiss={ __( 'OK, Got it!', 'google-site-kit' ) }
			dismissExpires={ getTimeInSeconds( 'day' ) }
			SmallImageSVG={ GatheringDataIcon }
			onDismiss={ handleOnDismiss }
			isDismissible
		/>
	);
}

GatheringDataNotification.propTypes = {
	title: PropTypes.string,
};
