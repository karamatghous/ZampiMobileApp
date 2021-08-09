import { compose, withHandlers, withState, withPropsOnChange, lifecycle } from "recompose";
import { connect } from "react-redux";
import _ from 'lodash';

import ContactsScreenView from "./ContactsScreenView";




const mapStateToProps = state => ({
    user: state.auth.user,
});

const enhance = compose(
    connect(mapStateToProps),

    withState('searchValue', 'setSearchValue', ''),
    withState('contactList', 'setContactList', [
        {
            profile: 'https://gh.cdn.sewest.net/assets/ident/news/e80b73da/Avenger_Blog_IronMan_Imagery4-ho31fqax6.jpg?quality=65', name: 'Tony Stark', fname: 'Tony', phone: '+917598198955', email: 'nijaahnandhrv@digisenz.com', address: 'Thanga Sengodan St, Ammapet, Salem.', callHistory: [{ phone: '7373043355', date: new Date(), recordedVoice: 'https://cdn-apsouth.plazeo.io/notification/ordernotification/order-notification-sound.mp3' },
            { phone: '9865711001', date: new Date(), recordedVoice: 'https://cdn-apsouth.plazeo.io/general/audio-files/EnjoyEnjami.mp3' }]
        }, { profile: 'https://i.ndtvimg.com/i/2017-07/spiderman-homecoming-review-facebook_640x480_51499949717.jpg', name: 'Peter Parker', fname: 'Peter', phone: '+917373043355', email: 'jamesawer3@gmail.com', address: '43rd Avenue, Long Island City, NY. Franklin K. Lane High School, 999 Jamaica Avenue, Brooklyn.' },
        { profile: 'https://i0.wp.com/chipandco.com/wp-content/uploads/2021/03/4ce62d8d979b8006b0789b8d161f04ea.jpg?resize=640%2C320&ssl=1', name: 'Pepper Potts', fname: 'Pepper', phone: '+919865711001', email: 'nijaaupwork@gmail.com', address: 'Malibu Point 10880, 90265, California, United States.' },
        { profile: 'https://economictimes.indiatimes.com/thumb/height-450,width-600,imgsize-220108,msid-69139984/captainamerica.jpg?from=mdr', name: 'Steve Rogers', fname: 'Steve', phone: '+918870048772', email: 'kavinkumark@znack.in', address: 'Columbia Heights, Washington, D.C' },
        { profile: 'https://thenationroar.com/wp-content/uploads/2020/04/blackpanther.jpg.1440x1000_q85_box-023640468_crop_detail.jpg', name: `Gopi`, fname: 'Digisenz', phone: '+19195990852', email: 'venugopalm@digisenz.com', address: 'Southwestern China, Burma, Nepal, Southern India, Indonesia.' },
        { profile: 'https://fastly.syfy.com/sites/syfy/files/styles/1170xauto/public/thor_big.0.jpg', name: 'Venugopal', fname: 'M', phone: '+919841246020', email: 'venugopalm@digisenz.com', address: 'Asgard, Old Norse Ásgardr,' },
        { profile: 'https://4.bp.blogspot.com/-Oq9aFygFKlI/XKWxkn_rsEI/AAAAAAAABPc/qM0R3qdmaDQlkwSvy1nipWXMRE-gS5LCQCKgBGAs/w0/avengers-endgame-hawkeye-clint-barton-uhdpaper.com-4K-85.jpg', name: 'Clint Barton', fname: 'Clint', phone: '+19195990852', email: 'gopim@digisenz.com', address: 'Missouri.' }]),

    withHandlers({
        onChangeSearchText: ({ setSearchValue }) => (searchText) => {
            setSearchValue(searchText);
        },
        onContactPressed: ({ navigation }) => (contactProp, contactIndex) => {

            console.log(navigation,"checking navigation");
            navigation.navigate('ContactDetailScreen', {
                contactProp: contactProp
            });
        }
    }),
    lifecycle({
        componentDidMount() {
// props from tabNavigator

            var self = this;
            console.log(self,"self");
            

            if (self.props.user && self.props.user.email && self.props.contactList.length > 0) {
                var foundIndex = _.findIndex(self.props.contactList, eachContact => eachContact.email == self.props.user.email)
                if (foundIndex >= 0)
                    self.props.contactList.splice(foundIndex, 1)
            }
        }
    })
);

export default enhance(ContactsScreenView);