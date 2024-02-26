// export var BASE_URL = "https://myrizq-backend.onrender.com";
// export var BASE_URL = "http://localhost:3001";
export var BASE_URL = "https://corona-backend-agfd.onrender.com";
export var GOOGLE_CLIENT_ID = "242626251664-pg5lmetaaaqreh3pddstjs3q1239nqnp.apps.googleusercontent.com";
export var ERROR_IMAGE = "https://i.ibb.co/ZcyDnfq/dizzy-robot.png";

export var Data = {
  1: {
    question: "have you been tested positive for COVID 19?",
    options: [
      {
        option: "Tested Positive",
        action: "3",
        list: [],
      },
      {
        option: "No, but recently had symptoms",
        action: "2",
        list: [],
      },
      {
        option: "Tested Negative",
        action: "2",
        list: [],
      },
    ],
  },
  2: {
    question:
      "Since you stated you either tested negative or had symptoms, wolud you still like to record your heatlh",
    options: [
      {
        option: "Yes",
        action: "4",
        list: [],
      },
      {
        option: "No",
        action: "end",
        list: [],
      },
    ],
  },
  3: {
    question:
      "You stated you have been tested positive for COVID-19; Do you wish to record your symptoms?",
    options: [
      {
        option: "Yes",
        action: "4",
        list: [],
      },
      {
        option: "No",
        action: "end",
        list: [],
      },
    ],
  },
  4: {
    question: "Are you experiencing any headaches?",
    options: [
      {
        option: "Yes",
        action: "5",
        list: [
          "Stay hydrated. Not enough fluids puts pressure on nerves that can trigger a headache.",
          "Take pain medications such ibuprofen - Always follow guide as shown on packet",
          "Do a light physical activity like walking",
          "Get some sleep",
        ],
      },
      {
        option: "No",
        action: "5",
        list: [],
      },
    ],
  },
  5: {
    question: "Do you have a constant dry cough?",
    options: [
      {
        option: "Yes",
        action: "6",
        list: [
          "Keep hydrated.",
          "Soothe your throat by drinking a warm drink with honey and lemon",
          "Suck a sugary sweet if you feel yourself starting to cough",
          "Blowing your nose can help with a dry cough",
        ],
      },
      {
        option: "No",
        action: "6",
        list: [],
      },
    ],
  },
  6: {
    question: "Do you have a fever?",
    options: [
      {
        option: "Yes",
        action: "7",
        list: [
          "Get some rest.",
          "Drink plenty of water to avoid dehydration.",
          "Take paracetamol or ibuprofen if you feel uncomfortable – Always follow instructions that come with your medicine",
        ],
      },
      {
        option: "No",
        action: "7",
        list: [],
      },
    ],
  },
  7: {
    question: "Do you feel tired or have body pain?",
    options: [
      {
        option: "Yes",
        action: "8",
        list: [
          "Pain relievers such as acetaminophen or ibuprofen can be taken – Always follow instructions that come with your medicine",
          "Take a hot shower it is said by most patients it helps with pain",
          "Cold packs on areas with pain may also help",
          "Take a nap and just lay back until pain has resided",
        ],
      },
      {
        option: "No",
        action: "8",
        list: [],
      },
    ],
  },
  8: {
    question: "Do you have lost sense of taste?",
    options: [
      {
        option: "Yes",
        action: "9",
        list: [
          "Add lemon and honey to a glass of water. You can drink this mixture immediately. This beverage has a strong smell which can help with lost sense of taste",
          "Take a piece of ginger and chew it slowly. The aroma of ginger is strong and can enhance your sense of taste",
          "Take peppermint leaves and add them to a cup of water. Boil the ingredients in a saucepan. Add some honey to it and drink. Peppermint is anti-inflammatory and antimicrobial in nature which can alter your sense of taste.",
        ],
      },
      {
        option: "No",
        action: "9",
        list: [],
      },
    ],
  },
  9: {
    question: "Do you have lost sense of smell?",
    options: [
      {
        option: "Yes",
        action: "10",
        list: [
          "Olfactory retraining is the process of retraining your nose to smell. It involves smelling strong scents",
          "High-volume saline irrigations or sinus rinses help improve inflammation in the nose after an infection and may improve recovery after infection.",
          "Eating food cold or at room temperature: Steam is what carries that sense of  smell to your nose.",
        ],
      },
      {
        option: "No",
        action: "10",
        list: [],
      },
    ],
  },
  10: {
    question: "Do you have a shortness of breath or difficulty breathing?",
    options: [
      {
        option: "Yes",
        action: "11",
        list: [
          "Note: Emergency Services must be called if you have the following: pain or tightness in the chest, loss of speech or movement, pale or bluish lips, face, or nails, a high fever.",
          "Lying in a prone position, on the stomach with the head turned to one side, while resting may help relieve shortness of breath",
          "Try different breathing exercises",
          "Breathe in through the nose",
          "Open a window for fresh air – Ventilation is important",
        ],
      },
      {
        option: "No",
        action: "11",
        list: [],
      },
    ],
  },
  11: {
    question: "Do you feel nauseous?",
    options: [
      {
        option: "Yes",
        action: "12",
        list: [
          "get plenty of fresh air",
          "distract yourself – for example, listen to music or watch a film",
          "take regular sips of a cold drink",
          "drink ginger or peppermint tea",
          "eat foods containing ginger – such as ginger biscuits",
          "eat smaller, more frequent meals",
        ],
      },
      {
        option: "No",
        action: "12",
        list: [],
      },
    ],
  },
  12: {
    question: "Do you feel better than yesterday or the same?",
    options: [
      {
        option: "I feel better",
        action: "end",
        list: [],
      },
      {
        option: "I feel the same",
        action: "end",
        list: [],
      },
    ],
  },
};
