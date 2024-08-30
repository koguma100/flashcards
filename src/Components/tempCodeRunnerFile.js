useEffect(() => {
      const fetchData = async () => {
        try {
          // Reference to the path in the database
          const dataRef = ref(db, 'users/' + auth.currentUser.uid); 
  
          // Fetch data from the database
          const snapshot = await get(dataRef);
  
          if (snapshot.exists()) {
            // Set data to state
            console.log(snapshot.val());

            setData( data => ({
              ...snapshot.val()
            }));
            setDataLoaded(true);
          
          } else {
            console.log('No data available');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, [location]);