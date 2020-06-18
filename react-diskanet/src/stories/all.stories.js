import React from 'react';
import { storiesOf } from '@storybook/react';

import { Banner, BoxPanel, RegisterScreen } from '../App.js';


storiesOf('banner', module)
	.add('test', () => <BoxPanel>Test</BoxPanel>)
	.add('test2', () => <Banner/>);
