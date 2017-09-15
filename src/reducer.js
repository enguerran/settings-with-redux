const CHANGE_SETTING = "CHANGE_SETTING";

const reduceSetting = (state, action) => {
  return { ...state, value: action.value };
};

export default (state = settings, action = {}) => {
  switch (action.type) {
    case CHANGE_SETTING:
      return {
        ...state,
        [action.setting]: reduceSetting(state[action.setting], action)
      };
    default:
      return state;
  }
};

// SELECTORS
export const getSettings = state => state;
export const isBackupOn = state => state.mediaBackup.value

// ACTION CREATORS
export const changeSetting = setting => value => ({
  type: CHANGE_SETTING,
  setting,
  value
});

const settings = {
  url: {
    name: "url",
    description: "Server's url",
    value: "https://codesandbox.io"
  },
  mediaBackup: {
    name: "mediaBackup",
    description: "Back up & sync",
    value: false
  },
  wifiOnly: {
    name: "wifiOnly",
    description: "Back up on wifi only?",
    value: false
  }
};
