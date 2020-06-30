import React from 'react';
import { storiesOf } from '@storybook/react';

import { Banner, BoxPanel, RegisterScreen } from '../App.js';
import { DiscoverScreen, FilterButton, FilterPanel } from '../Discover.js';
import {Site} from '../Site.js';
import {UserInformation} from '../Profile.js';

storiesOf('MVP', module)
	.add('BoxPanel', () => <BoxPanel>Test</BoxPanel>)
	.add('Banner', () => <Banner/>)
	.add('Filter', () => <DiscoverScreen></DiscoverScreen>)
	.add('Site Example', () => <Site />)
	.add('Profile', () => <UserInformation />)