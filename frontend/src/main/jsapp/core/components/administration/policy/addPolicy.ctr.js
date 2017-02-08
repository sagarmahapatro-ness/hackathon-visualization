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
    function addPolicyCtr(
            $scope,
            $q,
            policyService,
            $mdDialog,
            $state,
            infrastructureConnectorService,
            $rootScope
            ) {

        $scope.$emit('listenHeaderText', {headerText: "Policy"});

        $scope.redirectInSPS = function(){
            $state.go('home.policy.policylist.securitypolicyset');
        };
    }

    angular.module('shieldxApp').controller('addPolicyCtr', addPolicyCtr);
})();
