const getAnalytics = async (req, res) => {
    const { alias } = req.params; // Extract alias from the request parameters
    
    try {
      // Find the shortened URL by alias
      const shortUrl = await ShortUrl.findOne({ alias });
      if (!shortUrl) {
        return res.status(404).json({ message: 'Short URL not found' });
      }
      
      // Fetch analytics data for this short URL
      const analytics = await Analytics.find({ shortUrlId: shortUrl._id });
      
      // Prepare the response with relevant analytics
      const response = {
        totalClicks: analytics.length, // Count total clicks
        uniqueUsers: new Set(analytics.map(a => a.userId)).size, // Count unique users
        clicksByDate: [], // You'll need logic to group clicks by date
        osType: [], // Logic to group by OS
        deviceType: [] // Logic to group by device type
      };
  
      // Group the analytics data and calculate counts for each category
      analytics.forEach(item => {
        // Group by date, OS, device type here and populate the response
      });
  
      return res.json(response);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };

  const getTopicAnalytics = async (req, res) => {
    const { topic } = req.params; // Get topic from the request parameters
  
    try {
      // Find all short URLs associated with the topic
      const shortUrls = await ShortUrl.find({ topic });
  
      if (!shortUrls.length) {
        return res.status(404).json({ message: 'No URLs found for this topic' });
      }
  
      // Fetch analytics for all the short URLs under the topic
      const analyticsData = await Analytics.find({ shortUrlId: { $in: shortUrls.map(url => url._id) } });
  
      // Group and calculate analytics by topic
      const response = {
        totalClicks: analyticsData.length,
        uniqueUsers: new Set(analyticsData.map(a => a.userId)).size, // Count unique users
        clicksByDate: [], // Logic to group clicks by date
        osType: [], // Logic to group by OS
        deviceType: [] // Logic to group by device type
      };
  
      // Return the response
      return res.json(response);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };
  
module.exports = { getAnalytics, getTopicAnalytics };