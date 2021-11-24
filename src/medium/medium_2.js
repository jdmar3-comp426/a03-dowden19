import mpg_data from "./data/mpg_data.js";
import {getStatistics} from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */

 let cityMpg = 0;
 let highwayMpg = 0;
 let hybrid_count = 0;
 let years = [];
 mpg_data.forEach(car => {
     cityMpg += car["city_mpg"]
     highwayMpg += car["highway_mpg"];
     if (car["hybrid"]) {
         hybrid_count = hybrid_count + 1;
     }
     years.push(car["year"]);
 });

export const allCarStats = {
    avgMpg: {city:(cityMpg/mpg_data.length),highway:(highwayMpg/mpg_data.length)},
    allYearStats: getStatistics(years),
    ratioHybrids: hybrid_count/(mpg_data.length),
};




let hybridsArray = [];

mpg_data.forEach(car => {

    let make = car["make"];
    let id = car["id"];
    let added = false;

    if (car["hybrid"]) {
        hybridsArray.forEach(el => {
            if (el["make"] == make) {
                el["hybrids"].push(id);
                added = true;
            }
        });
        if (!added) {
            var obj = {}
            obj["make"] = make;
            obj["hybrids"] = [id];
            hybridsArray.push(obj);
        }
    }
});
hybridsArray.sort(function(a,b) {
    return (b.hybrids).length - (a.hybrids).length;
});

/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */

 let MPGYear = {};

 mpg_data.forEach(car => {

     let year = car["year"];

     if (MPGYear[year]===undefined) {
         MPGYear[year] = {hybrid:{city:0,highway:0,num:0}, notHybrid:{city:0,highway:0,num:0}};
     }

     if (car["hybrid"]) {
         MPGYear[year].hybrid.city += car["city_mpg"];
         MPGYear[year].hybrid.highway += car["highway_mpg"];
         MPGYear[year].hybrid.num += 1;
     } else {
        MPGYear[year].notHybrid.city += car["city_mpg"];
         MPGYear[year].notHybrid.highway += car["highway_mpg"];
         MPGYear[year].notHybrid.num += 1;
     }
 });

 for (const year in MPGYear) {
     MPGYear[year].hybrid.city = MPGYear[year].hybrid.city / MPGYear[year].hybrid.num;
     MPGYear[year].hybrid.highway = MPGYear[year].hybrid.highway / MPGYear[year].hybrid.num;
     MPGYear[year].notHybrid.city = MPGYear[year].notHybrid.city / MPGYear[year].notHybrid.num;
     MPGYear[year].notHybrid.highway = MPGYear[year].notHybrid.highway / MPGYear[year].notHybrid.num;
     delete MPGYear[year].hybrid.num;
     delete MPGYear[year].notHybrid.num;
 }

export const moreStats = {
    makerHybrids: hybridsArray,
    avgMpgByYearAndHybrid: MPGYear
};
