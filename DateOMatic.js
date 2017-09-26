/**
 * Date-O-Matic is a javascript Date utilities project.
 * @author Jaron White
 */

(function dateOMatic() {
    Date.prototype.getQuarter = function () {
        let m = this.getMonth();
        if (m < 3) {
            return 0;
        } else if (m > 2 && m < 6) {
            return 1;
        } else if (m > 5 && m < 9) {
            return 2;
        }
        return 3;
    }

    Date.prototype.format = function (format) {
        let year = this.getFullYear();
        let quarter = this.getQuarter();
        let month = this.getMonth();
        let day = this.getDate();
        let dayOfWeek = this.getDay();
        let hour = this.getHours();
        let minute = this.getMinutes();
        let second = this.getSeconds();

        function isLeapYear(year) {
            return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
        }

        function addLeadingZero(num) {
            if (num < 10) {
                num = "0" + num;
            }
            return num;
        }

        function firstWeekDayOfYear(year) {
            return new Date(year, 0, 1).getDay();
        }

        function firstWeekDayOfMonth(year, month) {
            return new Date(year, month, 1).getDay();
        }

        function daysInYear(year) {
            if (isLeapYear) {
                return 366;
            }
            return 365;
        }

        function daysInMonth(year, month) {
            month += 1;
            switch (month) {
                case 4:
                case 6:
                case 9:
                case 11:
                    return 30;
                    break;
                case 2:
                    if (isLeapYear(year)) {
                        return 29;
                    } else {
                        return 28;
                    }
                    break;
                default:
                    return 31;
            }
        }

        /*format y*/
        function formatYear(format, year) {
            if (format === "yy") {
                return year.toString().substring(2, 4);
            } else if (format === "yyyy") {
                return year;
            }
        }

        /*format q*/
        function formatQuarter(format, q) {

        }

        /*format M */
        function formatMonth(format, month) {
            let long = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
            ];
            let short = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec"
            ];
            switch (format) {
                case "M":
                    return month + 1;
                    break;
                case "MM":
                    return addLeadingZero(month + 1);
                    break;
                case "MMM":
                    return short[month];
                    break;
                case "MMMM":
                    return long[month];
            }
        }

        /*format d*/
        /* reuse for day, minute, second */
        function formatDay(format, day) {
            let count = format.split("").length;
            if (count == 2) {
                return addLeadingZero(day);
            }
            // console.log(format);
            return day;
        }

        /*format E*/
        function formatWeekDay(format, weekDay) {
            let long = [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
            ];
            let short = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            if (format === "E") {
                return short[weekDay];
            } else if (format === "EE") {
                return long[weekDay];
            }
        }

        /*format h 12hr H 24hr*/
        function formatHour(format, hour) {
            switch (format) {
                case "h":
                    if (hour > 12) {
                        hour -= 12;
                    } else if (hour === 0) {
                        hour = 12;
                    }
                    break;
                case "hh":
                    if (hour > 12) {
                        hour -= 12;
                    } else if (hour === 0) {
                        hour = 12;
                    }
                    if (hour < 100) {
                        hour = addLeadingZero(hour);
                    }
                    break;
                case "HH":
                    hour = addLeadingZero(hour);
                    break;
            }
            return hour;
        }

        function strParse() {
            let charSplit = format.split("");
            let prevChar = "";
            let prevFormat = "";
            let curPosition = 0;
            let rstr = "";
            for (let i in charSplit) {
                let curChar = charSplit[i];
                if (curChar !== prevChar) {
                    rstr += datePart(prevChar, prevFormat);
                    prevFormat = "";
                    curPosition += 1;
                }
                prevFormat += curChar;

                if (i == charSplit.length - 1) {
                    rstr += datePart(prevChar, prevFormat);
                }
                prevChar = curChar;
            }
            return rstr;
        }

        function datePart(type, format) {
            let formatted = "";
            let specialChar = "";
            let p = new RegExp("[ -/:]");
            if (p.test(type)) {
                specialChar = type;
            }
            // console.log(type);

            switch (type) {
                case "y":
                    formatted = formatYear(format, year);
                    break;
                case "q":
                    formatted = formatQuarter(format, quarter);
                    break;
                case "M":
                    formatted = formatMonth(format, month);
                    break;
                case "d":
                    formatted = formatDay(format, day);
                    break;
                case "E":
                    formatted = formatWeekDay(format, dayOfWeek);
                    break;
                case "h":
                case "H":
                    formatted = formatHour(format, hour);
                    break;
                case "m":
                    formatted = formatDay(format, minute);
                    break;
                case "s":
                    formatted = formatDay(format, second);
                    break;
                case specialChar:
                    formatted = type;
                    break;
                default:
            }
            return formatted;
        }

        return strParse(format);
    }

})();
