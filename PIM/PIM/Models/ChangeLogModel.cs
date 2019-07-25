using System;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace PIM.API.Models
{
    [XmlRoot("changeLog")]
    public class ChangeLog
    {
        [XmlArray("changes")]
        public List<Change> Changes { get; set; }
    }

    [XmlType("change")]
    public class Change
    {
        [XmlAttribute("date")]
        public DateTime Date { get; set; }
        [XmlAttribute("version")]
        public string Version { get; set; }
        [XmlArray("items")]
        public List<ChangeItem> Items { get; set; }
    }

    [XmlType("item")]
    public class ChangeItem
    {
        [XmlElement("serviceNowTicket")]
        public string ServiceNowTicket { get; set; }
        [XmlElement("message")]
        public string Message { get; set; }
    }
}