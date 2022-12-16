/**
 * AdminBarWidgets component tests.
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

import {
	render,
	createTestRegistry,
	provideModules,
	provideUserCapabilities,
} from '../../../../tests/js/test-utils';
import coreModulesFixture from '../../googlesitekit/modules/datastore/__fixtures__';
import { CORE_MODULES } from '../../googlesitekit/modules/datastore/constants';
import AdminBarWidgets from './AdminBarWidgets';

describe( 'AdminBarWidgets', () => {
	let registry;

	beforeEach( () => {
		registry = createTestRegistry();

		provideModules( registry );
		provideUserCapabilities( registry );

		fetchMock.get(
			/^\/google-site-kit\/v1\/modules\/search-console\/data\/searchanalytics/,
			{
				body: [
					{
						clicks: 123,
						ctr: 8.91,
						impressions: 4567,
						position: 23.456,
					},
				],
			}
		);
	} );

	it( 'should render the Admin Bar Widgets, including the Activate Analytics CTA', async () => {
		const { container, getByText, waitForResolvingPromise } = render(
			<AdminBarWidgets />,
			{
				registry,
			}
		);

		await waitForResolvingPromise();

		expect( container ).toMatchSnapshot();

		expect( getByText( /Set up Google Analytics/ ) ).toBeInTheDocument();
	} );

	it( 'should not render the Activate Analytics CTA when the Analytics module is not available', async () => {
		registry
			.dispatch( CORE_MODULES )
			.receiveGetModules(
				coreModulesFixture.filter(
					( { slug } ) => slug !== 'analytics'
				)
			);

		const { container, queryByText, waitForResolvingPromise } = render(
			<AdminBarWidgets />,
			{
				registry,
			}
		);

		await waitForResolvingPromise();

		expect( container ).toMatchSnapshot();

		expect(
			queryByText( /Set up Google Analytics/ )
		).not.toBeInTheDocument();
	} );
} );
