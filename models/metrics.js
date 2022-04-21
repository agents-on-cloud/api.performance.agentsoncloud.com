'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class metrics extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    // All metrics here represent weight
    // Min max help get value as percentage of between, relative_value = absolute_value-min/(max-min)
    // Average total score is each sum(relative_value * weight)/sum(weights)
    // Average behavioral score is each sum_behavioral( relative_value * weight)/sum(weights) 
    metrics.init({
        orgId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        timeUtility: {
            type: DataTypes.JSON,
            defaultValue: {
                "facilities.room": {
                    min: 0, max: 28800000, weight: 1
                },
                "facilities.equipment": {
                    min: 0, max: 28800000, weight: 1
                },
                "services": {
                    min: 0, max: 28800000, weight: 1
                }
            },
        },
        servicesUtility: {
            type: DataTypes.JSON,
            defaultValue: {
                entities: {
                    "facilities.room": {
                        min: 0, max: 28800000, weight: 1
                    },
                    "facilities.equipment": {
                        min: 0, max: 28800000, weight: 1
                    },
                    "providers.front": {
                        min: 0, max: 28800000, weight: 1
                    }
                },
            },
        },
        responseTime: {
            type: DataTypes.JSON,
            defaultValue: {
                "providers.operational": {
                    min: 0, max: 900000, weight: 1
                },
                "providers.front": {
                    min: 0, max: 300000, weight: 1
                },
                "suppliers": {
                    min: 0, max: 900000, weight: 1
                }
            }
        },
        returningCustomers: {
            type: DataTypes.JSON,
            defaultValue: {
                "services": {
                    min: 0, max: 3, weight: 1
                }
            }
        },
        bookings: {
            type: DataTypes.JSON,
            defaultValue: {
                "services": {
                    min: 0, max: 10, weight: 1
                }
            },
        },
        // money related
        sales: {
            type: DataTypes.JSON,
            defaultValue: {
                "providers.front": {
                    min: 0, max: 500, weight: 1
                }
            },
        },
        profit: {
            type: DataTypes.JSON,
            defaultValue: {
                "services": {
                    min: 0, max: 500, weight: 1
                }
            },
        },
        payments: {
            type: DataTypes.JSON,
            defaultValue: {
                "consumers": {
                    min: 0, max: 500, weight: 1
                }
            },
        },

        // behavioral
        durability: {
            type: DataTypes.JSON,
            defaultValue: {
                "facilities.room": {
                    min: 0, max: 1, weight: 1
                },
                "facilities.equipment": {
                    min: 0, max: 28800000, weight: 1
                },
            },
        },
        cleanliness: {
            type: DataTypes.JSON,
            defaultValue: {
                "facilities.room": {
                    min: 0, max: 1, weight: 1
                },
                "facilities.equipment": {
                    min: 0, max: 28800000, weight: 1
                },
                "providers.front": {
                    min: 0, max: 1, weight: 1
                },
                "services": {
                    min: 0, max: 1, weight: 1
                }
            },
        },
        responseQuality: {
            type: DataTypes.JSON,
            defaultValue: {
                "providers.operational": {
                    min: 0, max: 1, weight: 1
                },
                "providers.front": {
                    min: 0, max: 1, weight: 1
                },
                "suppliers": {
                    min: 0, max: 1, weight: 1
                }
            },
        },
        availability: {
            type: DataTypes.JSON,
            defaultValue: {
                "providers.managerial": {
                    min: 0, max: 1, weight: 1
                },
                "providers.front": {
                    min: 0, max: 1, weight: 1
                }
            },
        },
        reachability: {
            type: DataTypes.JSON,
            defaultValue: {
                "providers.managerial": {
                    min: 0, max: 1, weight: 1
                },
                "providers.front": {
                    min: 0, max: 1, weight: 1
                }
            },
        },
        punctuality: {
            type: DataTypes.JSON,
            defaultValue: {
                "providers.managerial": {
                    min: 0, max: 1, weight: 1
                },
                "providers.front": {
                    min: 0, max: 1, weight: 1
                },
                "services": {
                    min: 0, max: 1, weight: 1
                }
            },
        },
        manner: {
            type: DataTypes.JSON,
            defaultValue: {
                "services": {
                    min: 0, max: 1, weight: 1
                }
            },
        },
        communication: {
            type: DataTypes.JSON,
            defaultValue: {
                "services": {
                    min: 0, max: 1, weight: 1
                }
            },
        },
    }, {
        timestamps: false,
        sequelize,
        modelName: 'metrics',
        validate: {
            checkMinMax() {
                if (this.orgId !== "-1") Object.keys(this).forEach(metric => {
                    if (
                        this[metric].min || this[metric].max ||
                        isNan(this[metric].min) || isNan(this[metric.max]) ||
                        this[metric].min < 0 || this[metric].max <= 0 || this[metric].max < this[metric].min
                    ) throw new Error('Min and Max must be positive and logical');
                })
            }
        }
    });

    return metrics;
};