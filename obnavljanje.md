1. useFilters
2. schemas (refine, superrefine, errorMap), zod.coerce ( u staffingRequestSchema ustaffing_positions ima selected_staff_details I positions)
3. api classes (query)
4. functions: groupBy, createSelectOption, createQueryString, mergeArraysByKeys, createSelectGroup
5. date-fns
6. Permissions - ts
7. react query (gc, refetchInterval, cacheTime, staleTime)
8. react query isFetching vs isPending

9. Zasto ovo mora manuelno da se radi, kada je u zod schemi vec odradjeno:

const handleValidateStaffSelection = () => {
if (!currentPosition.position_id) {
setError(
`schedules.${scheduleIndex}.staffing_positions.${positionFields.length}.position_id`,
{
type: 'manual',
message: 'Position is required',
},
);
}

    return !!currentPosition.position_id;

};

10. StarRating komponenta (I druge kompnente Input, Select, FieldWrapper)
11. Sidebar (Drawer)
12. Konektovanje SingleDatePickera (MuldidayPickera, Inputa, Selecta I RepeatWeekDayPicker) u react-hook-form
