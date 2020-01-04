"use strict";

var gulp = require("gulp");
var rename = require("gulp-rename");
var sass = require("gulp-sass");

sass.compiler = require("node-sass");

gulp.task("sass", function() {
    return gulp.src("./styles/*.scss")
        .pipe(sass({}).on("error", sass.logError))
        .pipe(rename("style.css"))
        .pipe(gulp.dest("./dist"))
        .pipe(sass({outputStyle: "compressed"}).on("error", sass.logError))
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest("./dist"));
});

gulp.task("sass:watch", function() {
    gulp.watch("./styles/*.scss", gulp.series("sass"));
});
