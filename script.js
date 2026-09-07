const SUPABASE_URL = "https://jpzmxrjowgegyrbybdmx.supabase.co";
const SUPABASE_KEY = "sb_publishable_skoXDQf9b4cYT4JvlMraDQ_1U_V2L6R";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
// ---------- FIND OUR ELEMENTS ----------

const openButton = document.getElementById("openInvitation");
const seePlanButton = document.getElementById("seePlan");

const opening = document.querySelector(".opening");
const letter = document.getElementById("letter");
const plan = document.getElementById("plan");


// ---------- OPEN THE LETTER ----------

openButton.addEventListener("click", function () {

    // Hide opening screen
    opening.style.display = "none";

    // Show letter
    letter.classList.add("show");

    // Go back to top
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// ---------- SEE THE PLAN ----------

seePlanButton.addEventListener("click", function () {

    // Hide letter
    letter.classList.remove("show");

    // Show plan
    plan.classList.add("show");

    // Go back to top
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});
// ========================================
// RESTAURANT REVEAL
// ========================================

const revealRestaurantButton =
    document.getElementById("revealRestaurant");

const restaurantReveal =
    document.getElementById("restaurantReveal");

const envelope =
    document.getElementById("envelope");

const tinyInstruction =
    document.querySelector(".tiny-instruction");


// ---------- GO FROM PLAN TO ENVELOPE ----------

revealRestaurantButton.addEventListener("click", function () {

    // Hide itinerary
    plan.classList.remove("show");

    // Show envelope
    restaurantReveal.classList.add("show");

    // Return to top
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// ---------- OPEN ENVELOPE ----------

envelope.addEventListener("click", function () {

    if (envelope.classList.contains("open")) {
        return;
    }

    // Open envelope
    envelope.classList.add("open");

    // Change instruction
    tinyInstruction.textContent = "DINNER REVEALED";

    // Wait for the restaurant card animation
    // before showing the continue button
    setTimeout(function () {

        continueToRsvp.classList.add("show");

    }, 1000);

});
// ========================================
// RSVP
// ========================================

const continueToRsvp =
    document.getElementById("continueToRsvp");

const rsvp =
    document.getElementById("rsvp");

const yesButton =
    document.getElementById("yesButton");

const noButton =
    document.getElementById("noButton");

const rsvpNote =
    document.getElementById("rsvpNote");

const confirmation =
    document.getElementById("confirmation");


// ---------- RESTAURANT → RSVP ----------

continueToRsvp.addEventListener("click", function () {

    restaurantReveal.classList.remove("show");

    rsvp.classList.add("show");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// ========================================
// NO BUTTON SEQUENCE
// ========================================

const noResponses = [
    "why no?",
    "think about it again",
    "fym no?",
    "YES"
];

const noteResponses = [
    "samuel...",
    "wrong answer :/",
    "be so serious rn",
    "that's better :)"
];

let noCount = 0;


noButton.addEventListener("click", function () {

    if (noCount === 0) {
        noButton.textContent = "why no?";
        rsvpNote.textContent = "samuel...";
        noCount = 1;
    }

    else if (noCount === 1) {
        noButton.textContent = "think about it again";
        rsvpNote.textContent = "wrong answer :/";
        noCount = 2;
    }

    else if (noCount === 2) {
        noButton.textContent = "fym no?";
        rsvpNote.textContent = "be so serious rn";
        noCount = 3;
    }

    else if (noCount === 3) {
        noButton.textContent = "YES";
        rsvpNote.textContent = "that's better :)";

        noButton.style.background = "#22201d";
        noButton.style.color = "#f4f0e7";

        noCount = 4;
    }

    else if (noCount === 4) {
        acceptInvitation();
    }

});


    // Change button text
    noButton.textContent = noResponses[noCount];

    // Change handwritten message
    rsvpNote.textContent = noteResponses[noCount];

    // Move to next stage
    noCount++;


    // Make YES OBVIOUSLY grow
    yesButton.style.transform =
        `scale(${1 + noCount * 0.03})`;


    // When we've reached the final stage
    if (noCount === noResponses.length) {

        noButton.style.background = "#22201d";
        noButton.style.color = "#f4f0e7";

    }




// ========================================
// ACCEPT INVITATION
// ========================================

async function acceptInvitation() {

    // Save Samuel's RSVP to Supabase
    const { error } = await supabaseClient
        .from("rsvp")
        .insert([
            {
                response: "yes"
            }
        ]);

    if (error) {
        console.error("RSVP error:", error);
    } else {
        console.log("RSVP saved!");
    }

    // Show confirmation page
    rsvp.classList.remove("show");
    confirmation.classList.add("show");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// Normal YES button
yesButton.addEventListener("click", function () {

    acceptInvitation();

});