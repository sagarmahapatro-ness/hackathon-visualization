(function() {
    var TopNDetectedAppsWidget = function() {
        return {
            getDrillDownQueryData: function(intervalRef) {
                console.log(" TopNDetectedAppsWidget getDrillDownQueryData  ");
                console.log("intervalRef  " + intervalRef);
                var query = "_type:DPI AND event.applicationName:(";
                console.dir(arguments);
                var addFirst = true;
                for (i = 1; i < arguments.length; i++) {
                    if (!addFirst) {
                        query += " OR " + arguments[i];
                    } else if (addFirst) {
                        addFirst = false;
                        query += "  " + arguments[i];
                    }
                }
                query += ")";
                console.log("query  " + query);
                console.dir(arguments);
                var presentEpoch = Math.round(new Date().getTime());
                var pastEpoch = presentEpoch - (60 * intervalRef * 1000);

                var queryHeader = {
                    "index": "shieldxevents",
                    "ignore_unavailable": true,
                    "preference": 1481582140001
                };
                var queryBody = {
                    "size": 50,
                    "sort": [{
                        "aggregate": {
                            "order": "desc",
                            "unmapped_type": "boolean"
                        }
                    }],
                    "query": {
                        "bool": {
                            "must": [{
                                "query_string": {
                                    "query": query,
                                    "analyze_wildcard": true
                                }
                            }, {
                                "exists": {
                                    "field": "event.applicationName"
                                }
                            }, { "exists": { "field": "chassisId" } }, {
                                "range": {
                                    "aggregate": {
                                        "gte": pastEpoch,
                                        "lte": presentEpoch,
                                        "format": "epoch_millis"
                                    }
                                }
                            }],
                            "must_not": []
                        }
                    }
                };
                return JSON.stringify(queryHeader) + "\n" + JSON.stringify(queryBody);
            },
            getQueryData: function(intervalRef, sizevalue) {
                console.log("intervalRef " + intervalRef);
                console.log("sizevalue " + sizevalue);
                if (!sizevalue) {
                    sizevalue = 5;
                }
                var presentEpoch = Math.round(new Date().getTime());
                var pastEpoch = presentEpoch - (60 * intervalRef * 1000);
                var queryHeader = {
                    "index": "shieldxevents",
                    "ignore_unavailable": true,
                    "preference": 1481580902567
                };

                if (!sizevalue) {
                    sizevalue = 50;
                }

                var queryBody = {
                    "size": 0,
                    "query": {
                        "bool": {
                            "must": [{
                                "query_string": {
                                    "analyze_wildcard": true,
                                    "query": "_type:DPI"
                                }
                            }, {
                                "range": {
                                    "aggregate": {
                                        "gte": pastEpoch,
                                        "lte": presentEpoch,
                                        "format": "epoch_millis"
                                    }
                                }
                            }],
                            "must_not": []
                        }
                    },
                    "aggs": {
                        "2": {
                            "terms": {
                                "field": "event.applicationName",
                                "size": sizevalue,
                                "order": {
                                    "_count": "desc"
                                }
                            }
                        }
                    }
                };
                return JSON.stringify(queryHeader) + "\n" + JSON.stringify(queryBody);
            },
            getDataMassageObject: function(data) {
                return {
                    getBarChartData: function() {
                        if (data && data.aggregations) {
                            var buckets = data.aggregations["2"].buckets;
                            var piChatData = WidgetDataUtil.parseBarChartData(buckets);
                            console.log("TopNDetectedAppsWidget getBarChartData");
                            console.dir(piChatData);
                            return piChatData;
                        }
                        return [];
                    }
                };
            },
            massageDrillDowndata: function(data) {
                var tabularView = {};
                tabularView.headers = [];
                tabularView.headers.push({ title: 'Application Name' });
                tabularView.headers.push({ title: 'Protocol Name' });
                tabularView.headers.push({ title: 'Source IP' });
                tabularView.headers.push({ title: 'Source Port' });
                tabularView.headers.push({ title: 'Destination IP' });
                tabularView.headers.push({ title: 'Destination Port' });
                //tabularView.headers.push({title: 'Domain'});
                tabularView.rowData = [];

                console.log("massageDrillDowndata ");
                var events = data.responses[0].hits.hits;
                for (var i = 0; i < events.length; i++) {
                    var source = events[i]._source;
                    tabularView.rowData.push({ val1: source.event.applicationName, val2: source.event.protocolName, val3: source.event.srcIpAddress, val4: source.event.srcPort, val5: source.event.dstIpAddress, val6: source.event.dstPort });
                }
                console.dir(tabularView);
                return tabularView;
            }
        };
    };
    angular.module('shieldxApp').factory(WidgetName.TopNDetectedApps + "Factory", TopNDetectedAppsWidget);
})();
