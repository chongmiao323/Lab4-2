fetch('userProfiles.json') // Suppose the JSON file path is userProfiles.json
  .then(response => {
    if (!response.ok) {
      throw new Error('Fetch error: ' + response.status);
    } else {
      return response.json();
    }
  })
  .then(users => {
    const userBody = document.getElementById('userBody');
    users.forEach(user => {
      const firstName = user.firstName; 
      const lastName = user.lastName; 
      const address = `${user.address.street}, ${user.address.city}, ${user.address.state} ${user.address.zipCode}`;
      const subscriptionStatus = user.userPreferences.subscription 
        ? '<span class="subscription">Subscribed</span>' 
        : '<span class="no-subscription">Not Subscribed</span>';
      const notificationsStatus = user.userPreferences.notifications 
        ? 'Enabled' 
        : 'Disabled';

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td>${user.email}</td>
        <td>${user.dateOfBirth}</td>
        <td>${address}</td>
        <td>${user.userPreferences.theme}</td>
        <td>${user.userPreferences.language}</td>
        <td>${subscriptionStatus}</td>
        <td>${notificationsStatus}</td>
      `;
      userBody.appendChild(row);
    });
  })
  .catch(err => {
    console.error('Fetch error: ' + err.message);
    document.getElementById('userBody').innerHTML = '<tr><td colspan="9">Failed to load user data</td></tr>'; 
  });