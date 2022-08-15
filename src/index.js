// Copyright [2021] [Allow2 Pty Ltd]
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

'use strict';
import TabContent from './Components/TabContent';
import Wemo from "../../allow2automate-wemo/src/Wemo";

function plugin(context) {

    var plugin = {
        transientData: 'some transient value'
    };

    //
    // onLoad (optional - but recommended): called on the main process when this plugin is loaded
    //
    plugin.onLoad = function(loadState) {

        // you can locally hold state if you want
        // state = loadState;

        // Also set up any ipc message handling here
        context.ipc.on('myCustomMessage', function(event, params) {
            console.log('processing my custom message', params);
        });
    };

    //
    // onSetEnabled (optional): called by the electron main process when this plugin is enabled/disabled
    //
    // plugin.onSetEnabled = function(enabled) {
    //    isEnabled = enabled
    //    // should probably stop/start processing events here, timers, etc - whatever makes sense for your plugin
    //    // to be "enabled" or "disabled".
    // };

    //
    // onUnload (optional): called if the user is (removing) deleting the plugin, use this to clean up before the plugin disappears
    //
    // plugin.onUnload = function(callback) {
    //     // stop all timers, disconnect listeners, etc
    //     callback(null);
    // };

    return plugin;
}

module.exports = {
    plugin,
    TabContent
};
