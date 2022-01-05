using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SlackAPI;

namespace InsideNet.Services;

public class SlackService
{
    private readonly SlackTaskClient slackClient;

    public SlackService(SlackTaskClient slackClient)
    {
        this.slackClient = slackClient;
    }

    public async Task<Channel[]> GetChannelsList()
    {
        var conversations = await slackClient.GetConversationsListAsync();
        return conversations.channels;
    }

    public async Task InviteToChannel(string channelId, string userId)
    {
        await slackClient.ConversationsInviteAsync(channelId, new[] { userId });
    }
}
