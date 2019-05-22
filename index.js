const Alexa = require('alexa-sdk');
const APP_ID = 'amzn1.ask.skill.7417e022-2873-42ab-8bc7-7ef7152b81ef';

exports.handler = (event, context, callback) => {
    const alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    'LaunchRequest': function() {
        const welcomeMessage = 'Welcome to plan my trip from Lambda. You can say Help me plan my trip';
        this.response.speak(welcomeMessage).listen(); 
        this.emit(':responseReady');
    },
    'SessionEndedRequest': function() {
    },
    'AMAZON.HelpIntent': function() {
        this.emit('LaunchRequest');
    },
    'AMAZON.CancelIntent': function() {
        this.response.speak('Goodbye');
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function() {
        this.response.speak('Goodbye');
        this.emit(':responseReady');
    },
    'PlanMyTrip': function() {
        if (this.event.request.dialogState === 'STARTED' || this.event.request.dialogState === 'IN_PROGRESS') {
            this.emit(':delegate');
        } else if (this.event.request.dialogState === 'COMPLETED') {
            const fromCity = this.event.request.intent.slots.fromCity.value;
            const toCity = this.event.request.intent.slots.toCity.value;
            const travelDate = this.event.request.intent.slots.travelDate.value;

            // Some business logic.
            const speech = `Your travel itinerary is from ${fromCity} to ${toCity} on ${travelDate}.`;
            this.response.speak(speech);
            this.emit(':responseReady');
        }
    }
};