function Automobile(year, make, model, type) {
  this.year = year; //integer (ex. 2001, 1995)
  this.make = make; //string (ex. Honda, Ford)
  this.model = model; //string (ex. Accord, Focus)
  this.type = type; //string (ex. Pickup, SUV)
}

var automobiles = [
  new Automobile(1995, "Honda", "Accord", "Sedan"),
  new Automobile(1990, "Ford", "F-150", "Pickup"),
  new Automobile(2000, "GMC", "Tahoe", "SUV"),
  new Automobile(2010, "Toyota", "Tacoma", "Pickup"),
  new Automobile(2005, "Lotus", "Elise", "Roadster"),
  new Automobile(2008, "Subaru", "Outback", "Wagon")
];

/* This function sorts arrays using an arbitrary comparator.
 * You pass it a comparator and an array of objects appropriate for that
 * comparator and it will return a new array which is sorted with the largest
 * object in index 0 and the smallest in the last index
 */
function sortArr(comparator, array) {
  // Return the array if there's fewer than 2 elements, since it's already sorted.
  if (array.length <= 1) {
    return array;
  }

  for (i = 0; i < array.length - 1; i++) {
    for (j = 0; j < array.length - i - 1; j++) {
      if (!comparator(array[j], array[j + 1])) {
        // Swap values in the array if the first element isn't greater than the
        // following element, using a bubble sort.
        var temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }
  // Return the sorted array

  return array;
}

/* A comparator takes two arguments and uses some algorithm to compare them.
 * If the first argument is larger or greater than the 2nd it returns true,
 * otherwise it returns false. Here is an example that works on integers
 */
function exComparator(int1, int2) {
  if (int1 > int2) {
    return true;
  } else {
    return false;
  }
}

/* For all comparators if cars are 'tied' according to the comparison rules then
 * the order of those 'tied' cars is not specified and either can come first
 */

/* This compares two automobiles based on their year. Newer cars are "greater"
 * than older cars.
 */
function yearComparator(auto1, auto2) {
  if (auto1.year > auto2.year) {
    return true;
  } else {
    return false;
  }
}

/* This compares two automobiles based on their make. It should be case
 * insensitive and makes which are alphabetically earlier in the alphabet are
 * "greater" than ones that come later.
 */
function makeComparator(auto1, auto2) {
  if (auto1.make.toLowerCase() < auto2.make.toLowerCase()) {
    return true;
  } else {
    return false;
  }
}

/* This compares two automobiles based on their type. The ordering from
 * "greatest" to "least" is as follows: roadster, pickup, suv, wagon, (types
 * not otherwise listed). It should be case insensitive. If two cars are of
 * equal type then the newest one by model year should be considered "greater".
 */
function typeComparator(auto1, auto2) {
  // Create a map of keys and values for types we can rank. Any undefined values
  // correspond to automobile types that are unranked that will be sorted by year.
  var ranking = new Map([
    ['roadster', 1],
    ['pickup', 2],
    ['suv', 3],
    ['wagon', 4]
  ]);

  if (typeof(ranking.get(auto1.type.toLowerCase())) == 'undefined' &&
    typeof(ranking.get(auto2.type.toLowerCase())) == 'undefined') {
    // Compare the years to sort these vehicles, since neither is of a type that we can rank.
    return yearComparator(auto1, auto2);
  } else if (typeof(ranking.get(auto1.type.toLowerCase())) == 'undefined') {
    // Return false, since only auto1 is an unranked type.
    return false;
  } else if (typeof(ranking.get(auto2.type.toLowerCase())) == 'undefined') {
    // Return true, since auto1 must be higher ranking than the undefined type of auto2.
    return true;
  }

  if (ranking.get(auto1.type.toLowerCase()) > ranking.get(auto2.type.toLowerCase())) {
    // Return false if the value of auto1 is higher than auto2, signifying a
    // higher ranking.
    return false;
  } else if (ranking.get(auto1.type.toLowerCase()) < ranking.get(auto2.type.toLowerCase())) {
    // Return true if the value of auto1 is less than auto2.
    return true;
  } else {
    // Compare the years to sort these vehicles if they're the same ranked type.
    return yearComparator(auto1, auto2);
  }

}

Automobile.prototype.logMe = function(showType) {
  if (showType) {
    console.log(`${this.year} ${this.make} ${this.model} ${this.type}`)
  } else {
    console.log(`${this.year} ${this.make} ${this.model}`)
  }
};

function outputResults() {
  console.log('*****');
  console.log('The cars sorted by year are:');
  sortArr(yearComparator, automobiles).forEach(function(car) {
    car.logMe(false);
  });
  console.log('\nThe cars sorted by make are:');
  sortArr(makeComparator, automobiles).forEach(function(car) {
    car.logMe(false);
  });
  console.log('\nThe cars sorted by type are:');
  sortArr(typeComparator, automobiles).forEach(function(car) {
    car.logMe(true);
  });
  console.log('*****');
}

outputResults();
/* Your program should output the following to the console.log, including the
 * opening and closing 5 stars. All values in parenthesis should be replaced
 * with appropriate values. Each line is a separate call to console.log.

 * Each line representing a car should be produced via a logMe function. This
 * function should be added to the Automobile class and accept a single boolean
 * argument. If the argument is 'true' then it prints "year make model type"
 * with the year, make, model and type being the values appropriate for the
 * automobile. If the argument is 'false' then the type is ommited and just the
 * "year make model" is logged.

*****
The cars sorted by year are:
(year make model of the 'greatest' car)
(...)
(year make model of the 'least' car)

The cars sorted by make are:
(year make model of the 'greatest' car)
(...)
(year make model of the 'least' car)

The cars sorted by type are:
(year make model type of the 'greatest' car)
(...)
(year make model type of the 'least' car)
*****

As an example of the content in the parenthesis:
1990 Ford F-150
*/
