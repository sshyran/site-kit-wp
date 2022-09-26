/**
 * Mock browser utils.
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
 * Creates a mock global location object. Sets up in beforeAll and tears down in afterAll.
 *
 * @since 1.70.0
 */
export function mockLocation() {
	let oldLocation;
	const locationAssignMock = jest.fn(
		( url ) => ( global.location.href = url )
	);
	const locationReloadMock = jest.fn();

	beforeAll( () => {
		oldLocation = global.location;
		delete global.location;
		global.location = Object.defineProperties(
			{},
			{
				assign: {
					configurable: true,
					value: locationAssignMock,
				},
				href: {
					configurable: true,
					value: 'https://example.com',
					writable: true,
				},
				reload: {
					configurable: true,
					value: locationReloadMock,
				},
			}
		);
	} );

	afterAll( () => {
		global.location = oldLocation;
	} );

	beforeEach( () => {
		locationAssignMock.mockReset();
		locationReloadMock.mockReset();
	} );
}
