package config

import (
	"log"
	"path/filepath"

	"github.com/spf13/viper"
)

var DefaultConfigFileName = "serverledge-conf"

// Get returns the configured value for a given key or the specified default.
func Get(key string, defaultValue interface{}) interface{} {
	if viper.IsSet(key) {
		return viper.Get(key)
	} else {
		return defaultValue
	}
}

func GetInt(key string, defaultValue int) int {
	if viper.IsSet(key) {
		return viper.GetInt(key)
	} else {
		return defaultValue
	}
}

func GetFloat(key string, defaultValue float64) float64 {
	if viper.IsSet(key) {
		return viper.GetFloat64(key)
	} else {
		return defaultValue
	}
}

func GetString(key string, defaultValue string) string {
	if viper.IsSet(key) {
		return viper.GetString(key)
	} else {
		return defaultValue
	}
}

func GetBool(key string, defaultValue bool) bool {
	if viper.IsSet(key) {
		return viper.GetBool(key)
	} else {
		return defaultValue
	}
}

// ReadConfiguration reads a configuration file stored in one of the predefined paths.
func ReadConfiguration(fileName string) {
	// paths where the config file can be placed
	viper.AddConfigPath("/etc/serverledge/")
	viper.AddConfigPath("$HOME/")
	viper.AddConfigPath(".")

	if fileName != "" {
		parentDir := filepath.Dir(fileName)
		baseName := filepath.Base(fileName)
		extension := filepath.Ext(baseName)
		baseNameNoExt := baseName[0 : len(baseName)-len(extension)]

		viper.SetConfigName(baseNameNoExt) //custom name of config file (without extension)
		viper.AddConfigPath(parentDir)
	} else {
		viper.SetConfigName(DefaultConfigFileName) // default name of config file (without extension)
	}

	if err := viper.ReadInConfig(); err != nil {
		if _, ok := err.(viper.ConfigFileNotFoundError); ok {
			// No configuration file parsed
		} else {
			log.Printf("Config file parsing failed!\n")
		}
	}
}
