 /*
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
	function newDasboardNameCtrl($scope,
		$mdDialog
		) {
		"ngInject";

		$scope.createNewName = function(groupName) {
			if($scope.dashboardName) $scope.dashboardName = groupName;
			$mdDialog.hide(groupName);
		};
		$scope.closeDialog = function() {
			$mdDialog.cancel();
		};

	}
	angular.module('shieldxApp').controller('newDasboardNameCtrl', newDasboardNameCtrl);
})();