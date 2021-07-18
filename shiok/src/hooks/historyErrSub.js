const errSubtitle = (state) => {
    switch (state.errorMessage) {
        case 'Existing friend':
            return 'This user had been added previously';
        default:
            return 'Please check your connection';
    }
};

export default errSubtitle;