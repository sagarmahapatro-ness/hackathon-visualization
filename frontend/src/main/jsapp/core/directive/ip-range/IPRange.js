/*
ShieldX Networks Inc. CONFIDENTIAL
----------------------------------
*
Copyright (c) 2016 ShieldX Networks Inc.
All Rights Reserved.
*
NOTICE: All information contained herein is, and remains
the property of ShieldX Networks Incorporated and its suppliers,
if any. The intellectual and technical concepts contained
herein are proprietary to ShieldX Networks Incorporated
and its suppliers and may be covered by U.S. and Foreign Patents,
patents in process, and are protected by trade secret or copyright law.
Dissemination of this information or reproduction of this material
is strictly forbidden unless prior written permission is obtained
from ShieldX Networks Incorporated.
*/

(function () {

    function IPRangeCtr() {
        console.log("Controller initialized");
        this.templatName = 'Quick-Setup-Header';
    }
    angular.module('shieldxApp').component("iprange", {
        templateUrl: '/core/directive/ip-range/ip-range.html', controller: IPRangeCtr, bindings: {
            values: '<'
        }
    });
})();