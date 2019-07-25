namespace PIM.API.Providers
{
    public interface IPasswordManagerProvider
    {
        string Hash(string password);
    }
}