/**
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
import API from 'googlesitekit-api';
import Data from 'googlesitekit-data';
import { createFetchStore } from '../../../googlesitekit/data/create-fetch-store';
import { MODULES_THANK_WITH_GOOGLE } from './constants';

const fetchGetSupporterWallSidebars = createFetchStore( {
	baseName: 'getSupporterWallSidebars',
	storeName: MODULES_THANK_WITH_GOOGLE,
	controlCallback: () => {
		return API.get(
			'modules',
			'thank-with-google',
			'supporter-wall-sidebars',
			null,
			{
				useCache: false,
			}
		);
	},
	reducerCallback: ( state, supporterWallSidebars ) => {
		return {
			...state,
			supporterWallSidebars,
		};
	},
} );

const fetchGetPromptSupporterWallStore = createFetchStore( {
	baseName: 'getPromptSupporterWall',
	storeName: MODULES_THANK_WITH_GOOGLE,
	controlCallback: () => {
		return API.get(
			'modules',
			'thank-with-google',
			'prompt-supporter-wall',
			null,
			{
				useCache: false,
			}
		);
	},
	reducerCallback: ( state, promptSupporterWall ) => {
		return {
			...state,
			promptSupporterWall,
		};
	},
} );

const baseInitialState = {
	supporterWallSidebars: undefined,
	promptSupporterWall: undefined,
};

const baseResolvers = {
	*getSupporterWallSidebars() {
		const registry = yield Data.commonActions.getRegistry();
		const sidebars = registry
			.select( MODULES_THANK_WITH_GOOGLE )
			.getSupporterWallSidebars();

		// If there are already sidebars loaded in the state, consider it fulfilled
		// and don't make an API request.
		if ( sidebars !== undefined ) {
			return;
		}

		yield fetchGetSupporterWallSidebars.actions.fetchGetSupporterWallSidebars();
	},

	*getPromptSupporterWall() {
		const registry = yield Data.commonActions.getRegistry();
		const promptSupporterWall = registry
			.select( MODULES_THANK_WITH_GOOGLE )
			.getPromptSupporterWall();

		// If there are already promptSupporterWall loaded in the state, consider it fulfilled
		// and don't make an API request.
		if ( promptSupporterWall !== undefined ) {
			return;
		}

		yield fetchGetPromptSupporterWallStore.actions.fetchGetPromptSupporterWall();
	},
};

const baseSelectors = {
	/**
	 * Gets the list of supporter wall sidebars from the server.
	 *
	 * @since 1.81.0
	 *
	 * @param {Object} state Data store's state.
	 * @return {(Array|undefined|null)} Supporter wall sidebars list. Returns undefined if it is not loaded yet.
	 */
	getSupporterWallSidebars( state ) {
		return state.supporterWallSidebars;
	},

	/**
	 * Gets the transient state for the supporter wall from the server.
	 *
	 * @since n.e.x.t
	 *
	 * @param {Object} state Data store's state.
	 * @return {(boolean|undefined| null)} `true` if the transient state for the supporter wall is available, `false` if not; `undefined` if it is not loaded yet.
	 */
	getPromptSupporterWall( state ) {
		return state.promptSupporterWall;
	},
};

const store = Data.combineStores(
	fetchGetSupporterWallSidebars,
	fetchGetPromptSupporterWallStore,
	{
		initialState: baseInitialState,
		resolvers: baseResolvers,
		selectors: baseSelectors,
	}
);

export const initialState = store.initialState;
export const actions = store.actions;
export const controls = store.controls;
export const reducer = store.reducer;
export const resolvers = store.resolvers;
export const selectors = store.selectors;

export default store;
