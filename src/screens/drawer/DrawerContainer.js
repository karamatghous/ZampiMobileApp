import { Linking, Platform, Alert } from 'react-native';
import { connect } from "react-redux";
import { compose, hoistStatics, lifecycle, withHandlers, withState } from "recompose";
import DrawerScreenView from "./DrawerScreenView";

const mapStateToProps = state => ({
    auth: state.auth,
    user: state.auth.user,
});

const enhance = compose(
    connect(mapStateToProps),
    withHandlers({
    }),
    lifecycle({
        componentDidMount() {
        },
        componentWillUnmount() {
        }
    })
);

export default hoistStatics(enhance)(DrawerScreenView);