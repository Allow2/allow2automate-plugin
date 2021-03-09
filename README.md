# plugin template project for Allow2Automate

Extend Allow2Automate with whatever functionality you like.

## how to publish a plugin

There are a few steps involved in setting up a new plugin and testing and publishing it.

1. first you need to understand how the plugins work and design and/or prototype your plugin
2. you can use this project as a basis for your plugin
3. once you get it compiling, you can manually insert it into the plugins directory for allow2automate and start allow2automate. It will detect your plugin and load it as if it was loaded from the published plugins directory.
4. 

# Plugin structure

Allow2automate plugins have 2 components. Most plugins will require both as they intend to both have a control interface and a service mechanism. Obviously then you need to be able to communicate between the 2 processes and also persist state.

## Control Interface

Each plugin must export a react component named "TabContent". This is the control interface that loads into the allow2automate. This component is transient and is only used to configure the plugin features and display status. It can achieve control in 2 ways. The main control it has is to change persisted state upon which the service mechanism relies to enforce behaviour. You also can use IPC to directly communicate with your Service Mechanism component, but this really should be used sparingly.

Be very aware that the component is transient, it is only loaded generally when the user actually switches to your plugin tab, it also can be unloaded if they switch to a different tab or closes the allow2automate window. For that reason, and because it is in the render process of the electron app, it should not set up any persistent behaviours, timers, background processes or anything really other than simple displaying status and providing interactive controls for users to configure your plugin.

All the control mechanism stuff needs to live in the Service Mechanism of your plugin, not here.

## Service actual controlMechanism
 
Each plugin must export a function named "plugin" that takes a single argument, being a "context" object. The context object will pass in several mechanisms and functions.

## inter-process communication (IPC)

Allow2automate provides a bi-directional ipc channel for all plugins, it is an element of the plugin component

Start by cloning this project

```bash
git clone https://allow2automate-plugin
```


