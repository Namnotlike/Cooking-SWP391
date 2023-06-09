USE [master]
GO
/****** Object:  Database [RecipeOrganize]    Script Date: 5/22/2023 1:27:40 PM ******/
CREATE DATABASE [RecipeOrganize]
GO
ALTER DATABASE [RecipeOrganize] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [RecipeOrganize].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [RecipeOrganize] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [RecipeOrganize] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [RecipeOrganize] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [RecipeOrganize] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [RecipeOrganize] SET ARITHABORT OFF 
GO
ALTER DATABASE [RecipeOrganize] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [RecipeOrganize] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [RecipeOrganize] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [RecipeOrganize] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [RecipeOrganize] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [RecipeOrganize] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [RecipeOrganize] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [RecipeOrganize] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [RecipeOrganize] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [RecipeOrganize] SET  DISABLE_BROKER 
GO
ALTER DATABASE [RecipeOrganize] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [RecipeOrganize] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [RecipeOrganize] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [RecipeOrganize] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [RecipeOrganize] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [RecipeOrganize] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [RecipeOrganize] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [RecipeOrganize] SET RECOVERY FULL 
GO
ALTER DATABASE [RecipeOrganize] SET  MULTI_USER 
GO
ALTER DATABASE [RecipeOrganize] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [RecipeOrganize] SET DB_CHAINING OFF 
GO
ALTER DATABASE [RecipeOrganize] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [RecipeOrganize] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [RecipeOrganize] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [RecipeOrganize] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'RecipeOrganize', N'ON'
GO
ALTER DATABASE [RecipeOrganize] SET QUERY_STORE = OFF
GO
USE [RecipeOrganize]
GO
/****** Object:  Table [dbo].[Account_tbl]    Script Date: 5/22/2023 1:27:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Account_tbl](
	[AccountID] [nchar](10) NOT NULL,
	[Status] [bit] NOT NULL,
	[Email] [nvarchar](max) NOT NULL,
	[Password] [nvarchar](max) NOT NULL,
	[Username] [nvarchar](max) NULL,
	[Fullname] [nvarchar](max) NULL,
	[Sex] [bit] NULL,
	[DateOfBirth] [date] NULL,
	[IsUser] [bit] NOT NULL,
 CONSTRAINT [PK_Account_tbl] PRIMARY KEY CLUSTERED 
(
	[AccountID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Dish_tbl]    Script Date: 5/22/2023 1:27:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Dish_tbl](
	[DishID] [nchar](10) NOT NULL,
	[DishName] [nvarchar](max) NOT NULL,
	[StaffID] [nchar](10) NOT NULL,
	[CreateDate] [date] NOT NULL,
	[Process] [nvarchar](max) NULL,
	[Ingredient] [nvarchar](max) NULL,
	[ImageUrl] [nvarchar](max) NULL,
	[TotalCalorie] [int] NULL,
	[RatingPoint] [int] NULL,
	[FeedbackCount] [int] NULL,
	[ReportCount] [int] NULL,
	[Status] [nchar](10) NOT NULL,
 CONSTRAINT [PK_Dish_tbl] PRIMARY KEY CLUSTERED 
(
	[DishID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Favorite_tbl]    Script Date: 5/22/2023 1:27:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Favorite_tbl](
	[UserID] [nchar](10) NOT NULL,
	[DishID] [nchar](10) NOT NULL,
 CONSTRAINT [PK_Favorite_tbl] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC,
	[DishID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Feedback_tbl]    Script Date: 5/22/2023 1:27:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Feedback_tbl](
	[DishID] [nchar](10) NOT NULL,
	[UserID] [nchar](10) NOT NULL,
	[DateCreate] [date] NOT NULL,
	[FeedbackContent] [nvarchar](max) NULL,
	[RatingPoint] [int] NOT NULL,
 CONSTRAINT [PK_Feedback_tbl_1] PRIMARY KEY CLUSTERED 
(
	[DishID] ASC,
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RecipeCustomized_tbl]    Script Date: 5/22/2023 1:27:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RecipeCustomized_tbl](
	[UserID] [nchar](10) NOT NULL,
	[DishID] [nchar](10) NOT NULL,
	[CreateDate] [date] NOT NULL,
	[ImageUrl] [nvarchar](max) NULL,
	[Ingredient] [nvarchar](max) NULL,
	[Process] [nvarchar](max) NULL,
	[TotalCalorie] [int] NULL,
 CONSTRAINT [PK_RecipeCustomized_tbl] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC,
	[DishID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Report_tbl]    Script Date: 5/22/2023 1:27:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Report_tbl](
	[ReportID] [nchar](10) NOT NULL,
	[ReporterID] [nchar](10) NOT NULL,
	[BeReportedID] [nchar](10) NOT NULL,
	[DishID] [nchar](10) NOT NULL,
	[CreateDate] [date] NOT NULL,
	[Description] [nvarchar](max) NULL,
	[ReportLevel] [int] NOT NULL,
 CONSTRAINT [PK_Report_tbl] PRIMARY KEY CLUSTERED 
(
	[ReportID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Role_tbl]    Script Date: 5/22/2023 1:27:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Role_tbl](
	[RoleID] [nchar](10) NOT NULL,
	[RoleName] [nvarchar](50) NOT NULL,
	[Status] [bit] NOT NULL,
 CONSTRAINT [PK_Role_tbl] PRIMARY KEY CLUSTERED 
(
	[RoleID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Staff_tbl]    Script Date: 5/22/2023 1:27:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Staff_tbl](
	[StaffID] [nchar](10) NOT NULL,
	[RoleID] [nchar](10) NOT NULL,
	[ImageUrl] [nvarchar](max) NULL,
	[RatingPoint] [int] NULL,
	[ReportedCount] [int] NULL,
	[BioDescription] [nvarchar](max) NULL,
	[RecipeCount] [int] NULL,
	[DateJoin] [date] NOT NULL,
 CONSTRAINT [PK_Staff_tbl] PRIMARY KEY CLUSTERED 
(
	[StaffID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tag_Dish]    Script Date: 5/22/2023 1:27:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tag_Dish](
	[TagID] [nchar](10) NOT NULL,
	[DishID] [nchar](10) NOT NULL,
 CONSTRAINT [PK_Tag_Dish_1] PRIMARY KEY CLUSTERED 
(
	[TagID] ASC,
	[DishID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tag_tbl]    Script Date: 5/22/2023 1:27:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tag_tbl](
	[TagID] [nchar](10) NOT NULL,
	[TagName] [nvarchar](250) NOT NULL,
 CONSTRAINT [PK_Spectify] PRIMARY KEY CLUSTERED 
(
	[TagID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tag_User]    Script Date: 5/22/2023 1:27:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tag_User](
	[TagID] [nchar](10) NOT NULL,
	[UserID] [nchar](10) NOT NULL,
 CONSTRAINT [PK_Tag_User_1] PRIMARY KEY CLUSTERED 
(
	[TagID] ASC,
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User_tbl]    Script Date: 5/22/2023 1:27:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User_tbl](
	[UserID] [nchar](10) NOT NULL,
	[ImageUrl] [nvarchar](max) NULL,
	[Weight] [int] NULL,
	[WeightExpect] [int] NULL,
	[Height] [int] NULL,
 CONSTRAINT [PK_Account] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[Dish_tbl]  WITH CHECK ADD  CONSTRAINT [FK_Dish_tbl_Staff_tbl] FOREIGN KEY([StaffID])
REFERENCES [dbo].[Staff_tbl] ([StaffID])
GO
ALTER TABLE [dbo].[Dish_tbl] CHECK CONSTRAINT [FK_Dish_tbl_Staff_tbl]
GO
ALTER TABLE [dbo].[Favorite_tbl]  WITH CHECK ADD  CONSTRAINT [FK_Favorite_tbl_Dish_tbl] FOREIGN KEY([DishID])
REFERENCES [dbo].[Dish_tbl] ([DishID])
GO
ALTER TABLE [dbo].[Favorite_tbl] CHECK CONSTRAINT [FK_Favorite_tbl_Dish_tbl]
GO
ALTER TABLE [dbo].[Favorite_tbl]  WITH CHECK ADD  CONSTRAINT [FK_Favorite_tbl_User_tbl] FOREIGN KEY([UserID])
REFERENCES [dbo].[User_tbl] ([UserID])
GO
ALTER TABLE [dbo].[Favorite_tbl] CHECK CONSTRAINT [FK_Favorite_tbl_User_tbl]
GO
ALTER TABLE [dbo].[Feedback_tbl]  WITH CHECK ADD  CONSTRAINT [FK_Feedback_tbl_Dish_tbl] FOREIGN KEY([DishID])
REFERENCES [dbo].[Dish_tbl] ([DishID])
GO
ALTER TABLE [dbo].[Feedback_tbl] CHECK CONSTRAINT [FK_Feedback_tbl_Dish_tbl]
GO
ALTER TABLE [dbo].[Feedback_tbl]  WITH CHECK ADD  CONSTRAINT [FK_Feedback_tbl_User_tbl] FOREIGN KEY([UserID])
REFERENCES [dbo].[User_tbl] ([UserID])
GO
ALTER TABLE [dbo].[Feedback_tbl] CHECK CONSTRAINT [FK_Feedback_tbl_User_tbl]
GO
ALTER TABLE [dbo].[RecipeCustomized_tbl]  WITH CHECK ADD  CONSTRAINT [FK_RecipeCustomized_tbl_Dish_tbl] FOREIGN KEY([DishID])
REFERENCES [dbo].[Dish_tbl] ([DishID])
GO
ALTER TABLE [dbo].[RecipeCustomized_tbl] CHECK CONSTRAINT [FK_RecipeCustomized_tbl_Dish_tbl]
GO
ALTER TABLE [dbo].[RecipeCustomized_tbl]  WITH CHECK ADD  CONSTRAINT [FK_RecipeCustomized_tbl_User_tbl] FOREIGN KEY([UserID])
REFERENCES [dbo].[User_tbl] ([UserID])
GO
ALTER TABLE [dbo].[RecipeCustomized_tbl] CHECK CONSTRAINT [FK_RecipeCustomized_tbl_User_tbl]
GO
ALTER TABLE [dbo].[Report_tbl]  WITH CHECK ADD  CONSTRAINT [FK_Report_tbl_Account_tbl] FOREIGN KEY([ReporterID])
REFERENCES [dbo].[Account_tbl] ([AccountID])
GO
ALTER TABLE [dbo].[Report_tbl] CHECK CONSTRAINT [FK_Report_tbl_Account_tbl]
GO
ALTER TABLE [dbo].[Report_tbl]  WITH CHECK ADD  CONSTRAINT [FK_Report_tbl_Account_tbl1] FOREIGN KEY([BeReportedID])
REFERENCES [dbo].[Account_tbl] ([AccountID])
GO
ALTER TABLE [dbo].[Report_tbl] CHECK CONSTRAINT [FK_Report_tbl_Account_tbl1]
GO
ALTER TABLE [dbo].[Report_tbl]  WITH CHECK ADD  CONSTRAINT [FK_Report_tbl_Dish_tbl] FOREIGN KEY([DishID])
REFERENCES [dbo].[Dish_tbl] ([DishID])
GO
ALTER TABLE [dbo].[Report_tbl] CHECK CONSTRAINT [FK_Report_tbl_Dish_tbl]
GO
ALTER TABLE [dbo].[Staff_tbl]  WITH CHECK ADD  CONSTRAINT [FK_Staff_tbl_Account_tbl] FOREIGN KEY([StaffID])
REFERENCES [dbo].[Account_tbl] ([AccountID])
GO
ALTER TABLE [dbo].[Staff_tbl] CHECK CONSTRAINT [FK_Staff_tbl_Account_tbl]
GO
ALTER TABLE [dbo].[Staff_tbl]  WITH CHECK ADD  CONSTRAINT [FK_Staff_tbl_Role_tbl] FOREIGN KEY([RoleID])
REFERENCES [dbo].[Role_tbl] ([RoleID])
GO
ALTER TABLE [dbo].[Staff_tbl] CHECK CONSTRAINT [FK_Staff_tbl_Role_tbl]
GO
ALTER TABLE [dbo].[Tag_Dish]  WITH CHECK ADD  CONSTRAINT [FK_Tag_Dish_Dish_tbl] FOREIGN KEY([DishID])
REFERENCES [dbo].[Dish_tbl] ([DishID])
GO
ALTER TABLE [dbo].[Tag_Dish] CHECK CONSTRAINT [FK_Tag_Dish_Dish_tbl]
GO
ALTER TABLE [dbo].[Tag_Dish]  WITH CHECK ADD  CONSTRAINT [FK_Tag_Dish_Tag_tbl] FOREIGN KEY([TagID])
REFERENCES [dbo].[Tag_tbl] ([TagID])
GO
ALTER TABLE [dbo].[Tag_Dish] CHECK CONSTRAINT [FK_Tag_Dish_Tag_tbl]
GO
ALTER TABLE [dbo].[Tag_User]  WITH CHECK ADD  CONSTRAINT [FK_Tag_User_Tag_tbl] FOREIGN KEY([TagID])
REFERENCES [dbo].[Tag_tbl] ([TagID])
GO
ALTER TABLE [dbo].[Tag_User] CHECK CONSTRAINT [FK_Tag_User_Tag_tbl]
GO
ALTER TABLE [dbo].[Tag_User]  WITH CHECK ADD  CONSTRAINT [FK_Tag_User_User_tbl] FOREIGN KEY([UserID])
REFERENCES [dbo].[User_tbl] ([UserID])
GO
ALTER TABLE [dbo].[Tag_User] CHECK CONSTRAINT [FK_Tag_User_User_tbl]
GO
ALTER TABLE [dbo].[User_tbl]  WITH CHECK ADD  CONSTRAINT [FK_User_tbl_Account_tbl] FOREIGN KEY([UserID])
REFERENCES [dbo].[Account_tbl] ([AccountID])
GO
ALTER TABLE [dbo].[User_tbl] CHECK CONSTRAINT [FK_User_tbl_Account_tbl]
GO
USE [master]
GO
ALTER DATABASE [RecipeOrganize] SET  READ_WRITE 
GO
