angular.module('database', [])
    .controller('MainCtrl', [
        '$scope', '$http',
        function ($scope, $http) {
            $scope.test = "Hello world!";
            $scope.database = [ ];
            $scope.addToDatabase = function () {
                // $scope.comments.push({
                //     title: $scope.formContent,
                //     upvotes: 0
                // });
                // $scope.formContent = '';
                if ($scope.formContent === '' || $scope.tagContent === '' || $scope.titleContent === '') {
                    return;
                }
                console.log("In addToDatabase with " + $scope.formContent);
                $scope.create({
                    title: $scope.titleContent,
                    tag: $scope.tagContent,
                    url: $scope.formContent
                });
                $scope.titleContent = '';
                $scope.tagContent = '';
                $scope.formContent = '';
            };
            // $scope.upvote = function (comment) {
            //     return $http
            //         .put("/comments/" + comment._id + "/upvote")
            //         .success(function (data) {
            //             console.log("upvote worked");
            //             comment.upvotes += 1;
            //         });
            // };
            // $scope.incrementUpvotes = function (comment) {
            //     // comment.upvotes += 1;
            //     $scope.upvote(comment);
            // };
            $scope.getAll = function () {
                return $http.get("/pictures").success(function (data) {
                    angular.copy(data, $scope.database);
                });
            };
            $scope.getAll();
            $scope.create = function (picture) {
                console.log("test");
                return $http.post('/pictures', picture).success(function (data) {
                    $scope.database.push(data);
                });
                $scope.getAll();
            };
            $scope.delete = function (comment) {
                $http
                    .delete("/comments/" + comment._id)
                    .success(function (data) {
                        console.log("delete worked");
                    });
                $scope.getAll();
            };
        }
    ]);