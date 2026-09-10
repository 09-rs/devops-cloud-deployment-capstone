\# DevOps Cloud Deployment Capstone



A full-stack DevOps application containerized with Docker, orchestrated using Docker Compose, and deployed on AWS EC2.



\## Project Overview



This project demonstrates the complete deployment lifecycle of a full-stack web application:



\- React frontend

\- Node.js + Express backend

\- PostgreSQL database

\- Docker containerization

\- Docker Compose orchestration

\- Persistent database storage

\- Health checks

\- Container restart resilience

\- AWS EC2 deployment

\- AWS Security Group configuration

\- GitHub version control



\## Architecture



```text

&#x20;                   Internet

&#x20;                      |

&#x20;                      | HTTP :8080

&#x20;                      v

&#x20;             +-------------------+

&#x20;             |   AWS EC2 Ubuntu  |

&#x20;             |                   |

&#x20;             |  Docker Compose   |

&#x20;             +---------+---------+

&#x20;                       |

&#x20;               +-------+-------+

&#x20;               |               |

&#x20;               v               v

&#x20;       +---------------+   +---------------+

&#x20;       |   Frontend    |   |    Backend    |

&#x20;       | React + Nginx |-->| Node + Express|

&#x20;       |    :80        |   |     :5000     |

&#x20;       +---------------+   +-------+-------+

&#x20;                                   |

&#x20;                                   | PostgreSQL

&#x20;                                   v

&#x20;                           +---------------+

&#x20;                           |   PostgreSQL  |

&#x20;                           |      :5432    |

&#x20;                           +-------+-------+

&#x20;                                   |

&#x20;                                   v

&#x20;                           Persistent Volume

