export function daysToHours(remainingDays, weeklyHours, daysPerWeek) {
    // Creating the days, hours and day per week variables to be used in the result breakdown
    const days = Number(remainingDays);
    const hours = Number(weeklyHours);
    const day_per_week = Number(daysPerWeek);

    // stops the function if any input isn't a real number
    if (!Number.isFinite(days) || !Number.isFinite(hours) || !Number.isFinite(day_per_week) || day_per_week <=0 ) {
        return null
    }

    const hoursPerDay = hours/day_per_week

    const wholeDays = Math.floor(days)
    const fractionalDays = days- wholeDays

    // split hours into whole hours and minutes
    const fractionalHours = fractionalDays * hoursPerDay
    let wholeHours = Math.floor(fractionalHours)
    let minutes = Math.round((fractionalHours - wholeHours) * 60)


    // checks to see if minutes is equal to 60 to add an hour and revert minutes back to 0
    if (minutes >= 60) {
        wholeHours +=1
        minutes = 0
    }
    
    
    
    // return the result totals
    return {
    totalDays: days,
    totalHours: days * hoursPerDay,
    holidayBreakdown: { days: wholeDays, hours: wholeHours, minutes }
}
}