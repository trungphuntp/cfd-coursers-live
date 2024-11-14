const DogReducer = (state = null, action) => {
    switch (action?.type) {
        case "UPDATE_DOG":
            return action?.payload;

        default:
            return state;
    }
};

export default DogReducer;
