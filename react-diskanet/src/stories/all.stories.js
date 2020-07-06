import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Banner, RegisterScreen } from '../App.js';
import { BoxPanel } from '../Components/components.js';
import { DiscoverScreen, FilterButton, FilterPanel } from '../Discover.js';
import { SiteScreen, SiteBox } from '../Site.js';
import { UserInformation } from '../Profile.js';

storiesOf('Panels', module)
    .add('BoxPanel Short', () => (
        <div>
        <h2>BoxPanel</h2>
        <p>A styled div used in the navbar</p>
        <BoxPanel>Test</BoxPanel> 
        <BoxPanel>This is a Test</BoxPanel> 
        <BoxPanel>This is a much longer Test of BoxPanel</BoxPanel>
        </div>
    ));

storiesOf('Sites', module)
    .add('Simple Site', () => (
        <SiteBox UserId={ 3 } SiteId={ 7 }
                 Site = { {
	             title: 'example title',
                     body: 'cool site: The quick brown fox jumped over the lazy dog',
                     background_color: 'tan',
                     body_font_size: '48',
                     title_font_size: '30',
                     body_font: 'Comic Sans MS',
                     title_font: 'Arial'
	         } } /> ))
    .add('Another Site', () => (
        <SiteBox UserId={ 3 } SiteId={ 7 }
                 Site = { {
	             title: 'Example Titles Are Good',
                     body: 'cool site: The quick brown fox jumped over the lazy dog',
                     background_color: 'green',
                     body_font_size: '48',
                     title_font_size: '30',
                     body_font: 'Palatino',
                     title_font: 'Arial'
	         } } /> ));

storiesOf('MVP', module)
    // .add('Banner', () => <Banner/>)
    .add('Filter', () => <DiscoverScreen something={action('register')}></DiscoverScreen>)
    .add('Profile', () => <UserInformation />);
