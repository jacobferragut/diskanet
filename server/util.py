import os
import yaml

def get_config(env, config_resource):
    #load config options for environment
    config_dict = yaml.load(config_resource, Loader=yaml.Loader)
    try:
        config_dict = config_dict[env]
    except KeyError:
        raise KeyError("Invalid ENV value")
    
    #load flask env varaibles
    for key, value in config_dict.items():
        if key.startswith('FLASK_'):
            config_dict[key[6:]] = value
    #load values from env
    for key, value in config_dict.items():
        if isinstance(value, str) and value.startswith('env:'):
            config_dict[key] = os.environ[value[4:]]
    #put the values in app config
    return config_dict
