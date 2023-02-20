export default function formattedshijian() {
    const formatted_time = (iso_date_string) => {
        const date = new Date(iso_date_string);
        return date.toLocaleDateString()
    };

    return {
        formatted_time
    }

}


//
// function formattedTime (iso_date_string) {
//       const date = new Date(iso_date_string);
//       return date.toLocaleDateString()
//     }