'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class metrics extends Model { };

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
                "facilities": {
                    min: 0, max: 28800000, weight: 1
                },
                "facilities.room": {
                    min: 0, max: 28800000, weight: 1
                },
                "facilities.equipment": {
                    min: 0, max: 28800000, weight: 1
                },
                "services": {
                    min: 0, max: 28800000, weight: 1
                },
                text: "Time Utility"
            },
        },
        servicesUtility: {
            type: DataTypes.JSON,
            defaultValue: {
                entities: {
                    "facilities": {
                        min: 0, max: 28800000, weight: 1
                    },
                    "facilities.room": {
                        min: 0, max: 28800000, weight: 1
                    },
                    "facilities.equipment": {
                        min: 0, max: 28800000, weight: 1
                    },
                    "providers.front": {
                        min: 0, max: 28800000, weight: 1
                    },
                    text: "Service Utility"
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
                },
                text: "Response Time"
            }
        },
        returningCustomers: {
            type: DataTypes.JSON,
            defaultValue: {
                "services": {
                    min: 0, max: 3, weight: 1
                },
                text: "Returning Customers"
            }
        },
        bookings: {
            type: DataTypes.JSON,
            defaultValue: {
                "services": {
                    min: 0, max: 10, weight: 1
                },
                text: "# of Bookings"
            },
        },

        // money related
        sales: {
            type: DataTypes.JSON,
            defaultValue: {
                "providers.front": {
                    min: 0, max: 500, weight: 1
                },
                text: "Sales"
            },
        },
        profit: {
            type: DataTypes.JSON,
            defaultValue: {
                "services": {
                    min: 0, max: 500, weight: 1
                },
                text: "Profit"
            },
        },
        payments: {
            type: DataTypes.JSON,
            defaultValue: {
                "consumers": {
                    min: 0, max: 500, weight: 1
                },
                text: "Payments"
            },
        },

        // behavioral
        durability: {
            type: DataTypes.JSON,
            defaultValue: {
                "facilities": {
                    min: 0, max: 1, weight: 1
                },
                "facilities.room": {
                    min: 0, max: 1, weight: 1
                },
                "facilities.equipment": {
                    min: 0, max: 1, weight: 1
                },
                isSocial: true,
                text: "Is it broken yet?"
            },
        },
        cleanliness: {
            type: DataTypes.JSON,
            defaultValue: {
                "facilities": {
                    min: 0, max: 1, weight: 1
                },
                "facilities.room": {
                    min: 0, max: 1, weight: 1
                },
                "facilities.equipment": {
                    min: 0, max: 1, weight: 1
                },
                "providers.front": {
                    min: 0, max: 1, weight: 1
                },
                "consumers": {
                    min: 0, max: 1, weight: 1
                },
                isSocial: true,
                text: "Is it clean?"
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
                },
                isSocial: true,
                text: "Was the response any good?",
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
                },
                isSocial: true,
                text: "Were they available?",
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
                },
                isSocial: true,
                text: "Were they reachable?",
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
                "consumers": {
                    min: 0, max: 1, weight: 1
                },
                isSocial: true,
                text: "Were they punctual?",
            },
        },
        manner: {
            type: DataTypes.JSON,
            defaultValue: {
                "consumers": {
                    min: 0, max: 1, weight: 1
                },
                isSocial: true,
                text: "Polite or Rude?",
            },
        },
        communication: {
            type: DataTypes.JSON,
            defaultValue: {
                "consumers": {
                    min: 0, max: 1, weight: 1
                },
                isSocial: true,
                text: "Were the talks useful?",
            },
        },
    }, {
        timestamps: false,
        sequelize,
        modelName: 'metrics',
        validate: {
            checkJSON() {
                if (this.orgId !== "-1") Object.keys(this).forEach(metric => {
                    if (
                        this[metric].min || this[metric].max ||
                        isNan(this[metric].min) || isNan(this[metric.max]) ||
                        this[metric].min < 0 || this[metric].max <= 0 || this[metric].max < this[metric].min ||
                        this[metric].weight < 1
                    ) throw new Error('Min and Max must be positive and logical And Weight be above 1');
                })
            }
        }
    });

    return metrics;
};