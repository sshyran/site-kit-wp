/**
 * ThankWithGoogleSupporterWallNotification Component Stories.
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
import ThankWithGoogleSupporterWallNotification from './ThankWithGoogleSupporterWallNotification';
import { provideModules, provideSiteInfo } from '../../../../tests/js/utils';
import WithRegistrySetup from '../../../../tests/js/WithRegistrySetup';
import { MODULES_THANK_WITH_GOOGLE } from '../../modules/thank-with-google/datastore/constants';

const Template = () => <ThankWithGoogleSupporterWallNotification />;

export const Ready = Template.bind( {} );
Ready.storyName = 'Ready';

export default {
	title: 'Components/ThankWithGoogleSupporterWallNotification',
	decorators: [
		( Story ) => {
			const setupRegistry = ( registry ) => {
				provideSiteInfo( registry );
				registry
					.dispatch( MODULES_THANK_WITH_GOOGLE )
					.receiveGetSupporterWallPrompt( {
						supporterWallPrompt: true,
					} );

				provideModules( registry, [
					{
						active: true,
						connected: true,
						slug: 'thank-with-google',
					},
				] );
			};

			return (
				<WithRegistrySetup func={ setupRegistry }>
					<Story />
				</WithRegistrySetup>
			);
		},
	],
};
