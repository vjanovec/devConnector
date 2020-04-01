import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfiles } from '../../actions/profile';
import ProfileItem from '../../components/profiles/ProfileItem';

const Profiles = ({ getProfiles, profile: { profiles, loading }}) => {
    useEffect(() => {
        getProfiles();
    }, []);

    return(
        <Fragment>
            {loading ? <Spinner /> : <Fragment>
                    <h1 className='large text-primary'>Developers</h1>
                    <p className='lead'>
                        <i className='fab fa-'></i> Browse and connect with developers
                    </p>
                    <div>
                        {profiles.length > 0 ? (
                            profiles.map(profile => (
                                profile.user ? <ProfileItem key={profile._id} profile={profile} /> : null
                            ))
                        ) : (<h4>No profiles found...</h4>)}
                    </div>
                
                
                </Fragment>}
        </Fragment>
    )
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile  
})

export default connect(mapStateToProps, { getProfiles })(Profiles);