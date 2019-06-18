$(document).ready(function(){
    // Defining the local dataset
    var parks = ["Acadia National Park", "National Park of American Samoa", "Arches National Park", "Badlands National Park", "Big Bend National Park", "Biscayne National Park", "Black Canyon of the Gunnison National Park", "Bryce Canyon National Park", "Canyonlands National Park", "Capitol Reef National Park", "Carlsbad Caverns National Park", "Channel Islands National Park", "Congaree National Park", "Crater Lake National Park", "Cuyahoga Valley National Park", "Death Valley National Park", "Denali National Park", "Dry Tortugas National Park", "Everglades National Park", "Gates of the Arctic National Park", "Glacier National Park", "Glacier Bay National Park", "Grand Canyon National Park", "Grand Teton National Park", "Great Basin National Park", "Great Sand Dunes National Park", "Great Smoky Mountains National Park", "Guadalupe Mountains National Park", "Haleakala National Park", "Hawaii Volcanoes National Park", "Hot Springs National Park", "Isle Royale National Park", "Joshua Tree National Park", "Katmai National Park and Preserve", "Kenai Fjords National Park", "Kings Canyon National Park", "Kobuk Valley National Park", "Lake Clark National Park and Preserve", "Lassen Volcanic National Park", "Mammoth Cave National Park", "Mesa Verde National Park", "Mount Rainier National Park", "North Cascades National Park", "Olympic National Park", "Petrified Forest National Park", "Pinnacles National Park", "Redwood National and State Parks", "Rocky Mountain National Park", "Saguaro National Park", "Sequoia National Park", "Shenandoah National Park", "Theodore Roosevelt National Park", "Virgin Islands National Park", "Voyageurs National Park", "Wind Cave National Park", "Wrangell-St. Elias National Park", "Yellowstone National Park", "Yosemite National Park", "Zion National Park"];
    
    // Constructing the suggestion engine
    var parks = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.whitespace,
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: parks
    });
    
    // Initializing the typeahead
    $("#location").typeahead({
        hint: true,
        highlight: true, /* Enable substring highlighting */
        minLength: 1 /* Specify minimum characters required for showing suggestions */
    },
    {
        name: 'parks',
        source: parks
    });
});