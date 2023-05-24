import { useEffect, useState } from 'react';
import { useAuth } from '../context/authContext';
import { getClients } from '../../api/clientsData';

export default function useFirebaseProfile() {
  const [profile, setProfile] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user.uid) {
      const getAllProfiles = async () => {
        const allProfiles = await getClients();
        const theProfiles = allProfiles.filter((index) => index.client_uid === user.uid);
        if (theProfiles.length > 0) {
          setProfile(theProfiles[0]);
        }
      };
      getAllProfiles();
    }
  }, [user]);

  return profile;
}
