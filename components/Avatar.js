// Components/Avatar.js

import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';

import ImagePicker from 'react-native-image-picker'

class Avatar extends React.Component {

    constructor(props) {
        super(props)
        /*this.state = {
            avatar: require('../assets/ic_tag_faces.png')
        }*/
        this._avatarClicked = this._avatarClicked.bind(this);
    }

    _avatarClicked() {
        // Ici nous appellerons la librairie react-native-image-picker pour récupérer un avatar
        ImagePicker.showImagePicker({}, (response) => {
            if (response.didCancel) {
                console.log("L'utilisateur a annulé");
            } else if (response.error) {
                console.log('Erreur : ', response.error);
            } else {
                console.log('Photo : ', response.uri);
                let requireSource = { uri: response.uri };
                const action = { type: 'SET_AVATAR', value: requireSource };
                this.props.dispatch(action);
                /*this.setState({
                    avatar: requireSource
                })*/
            }
        })
    }

    render() {

        return (
            <TouchableOpacity
                style={styles.touchableOpacity}
                onPress={this._avatarClicked}>
                <Image style={styles.avatar} source={this.props.userAvatar} />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    touchableOpacity: {
        margin: 5,
        width: 100, // Pensez bien à définir une largeur ici, sinon toute la largeur de l'écran sera cliquable
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: '#9B9B9B',
        borderWidth: 2
    }
})


//export default Avatar;

const mapStateToProps = (state) => {
    //console.log("Hello avater", state.setAvatar.userAvatar);
    return { userAvatar: state.setAvatar.userAvatar };
}
export default connect(mapStateToProps)(Avatar);
