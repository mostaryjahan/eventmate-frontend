"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getInitials } from "@/lib/formatters";
import { updateMyProfile } from "@/services/auth/auth.service";
import { getHostedEvents } from "@/services/host/hostedEventManagement";
import { getMyJoinedEvents } from "@/services/user/userEventManagement";
import { getHostReviews } from "@/services/review/review.service";
import { UserInfo } from "@/types/user.interface";
import { IEvent } from "@/types/event.interface";
import {
  Camera,
  Loader2,
  Save,
  Star,
  Calendar,
  MapPin,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition, useEffect } from "react";
import { toast } from "sonner";
import Image from "next/image";

interface MyProfileProps {
  userInfo: UserInfo;
}

interface UserStats {
  hostedEvents: IEvent[];
  joinedEvents: IEvent[];
  averageRating: number;
  totalReviews: number;
}

const MyProfile = ({ userInfo }: MyProfileProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [userStats, setUserStats] = useState<UserStats>({
    hostedEvents: [],
    joinedEvents: [],
    averageRating: 0,
    totalReviews: 0,
  });
  const [loading, setLoading] = useState(true);

  const getProfilePhoto = () => {
    if (userInfo.role === "ADMIN") {
      return userInfo?.image;
    } else if (userInfo.role === "HOST") {
      return userInfo?.image;
    } else if (userInfo.role === "USER") {
      return userInfo?.image;
    }
    return null;
  };

  const getProfileData = () => {
    if (userInfo.role === "ADMIN") {
      return userInfo;
    } else if (userInfo.role === "HOST") {
      return userInfo;
    } else if (userInfo.role === "USER") {
      return userInfo;
    }
    return null;
  };

  const profilePhoto = getProfilePhoto();
  const profileData = getProfileData();

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        setLoading(true);

        if (userInfo.role === "HOST") {
          const [hostedEventsRes, reviewsRes] = await Promise.all([
            getHostedEvents(),
            getHostReviews(userInfo.id),
          ]);

          const reviewData = await reviewsRes.json();

          setUserStats({
            hostedEvents: hostedEventsRes.success ? hostedEventsRes.data : [],
            joinedEvents: [],
            averageRating: reviewData.averageRating || 0,
            totalReviews: reviewData.totalReviews || 0,
          });
        } else if (userInfo.role === "USER") {
          const joinedEventsRes = await getMyJoinedEvents();

          setUserStats({
            hostedEvents: [],
            joinedEvents: joinedEventsRes.success ? joinedEventsRes.data : [],
            averageRating: 0,
            totalReviews: 0,
          });
        }
      } catch (error) {
        console.error("Error fetching user stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserStats();
  }, [userInfo.id, userInfo.role]);

  const renderInterestTags = () => {
    if (!profileData?.interests || profileData.interests.length === 0) {
      return (
        <p className="text-sm text-muted-foreground">No interests added</p>
      );
    }

    return (
      <div className="flex flex-wrap gap-2">
        {profileData.interests.map((interest, index) => (
          <Badge key={index} variant="secondary">
            {interest.trim()}
          </Badge>
        ))}
      </div>
    );
  };

  const renderEventCard = (event: IEvent) => (
    <Card key={event.id} className="mb-3">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Image
            src={event.image}
            alt={event.name}
            width={40}
            height={40}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm truncate">{event.name}</h4>
            <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(event.dateTime).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {event.location}
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {event._count?.participants || 0}
              </div>
            </div>
            <Badge
              variant={event.status === "OPEN" ? "default" : "secondary"}
              className="mt-2 text-xs"
            >
              {event.status}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);
    console.log("formData", formData);

    startTransition(async () => {
      const result = await updateMyProfile(formData);
      console.log("result", result);

      if (result.success) {
        setSuccess(result.message);
        toast.success(result.message);
        setPreviewImage(null);
        router.refresh();
      } else {
        setError(result.message);
        console.log("error", result.message);
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-xl md:text-3xl font-semibold">My Profile</h1>
        <p className="text-muted-foreground mt-1">
          Manage your personal information
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="h-32 w-32 border border-primary">
                  {previewImage || profilePhoto ? (
                    <AvatarImage
                      src={previewImage || (profilePhoto as string)}
                      alt={userInfo.name}
                    />
                  ) : (
                    <AvatarFallback className="text-3xl">
                      {getInitials(userInfo.name)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <label
                  htmlFor="file"
                  className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors"
                >
                  <Camera className="h-4 w-4" />
                  <Input
                    type="file"
                    id="file"
                    name="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                    disabled={isPending}
                  />
                </label>
              </div>

              <div className="text-center">
                <p className="font-semibold text-lg">{userInfo.name}</p>
                <p className="text-sm text-muted-foreground">
                  {userInfo.email}
                </p>
                <p className="text-xs text-muted-foreground mt-1 capitalize">
                  {userInfo.role.replace("_", " ")}
                </p>

                {/* Rating Summary for Hosts */}
                {userInfo.role === "HOST" && (
                  <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">
                        {userStats.averageRating.toFixed(1)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {userStats.totalReviews} reviews
                    </p>
                  </div>
                )}

                {/* Event Stats */}
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  {userInfo.role === "HOST" ? (
                    <>
                      <div className="bg-primary/10 p-2 rounded">
                        <p className="font-semibold text-primary">
                          {userStats.hostedEvents.length}
                        </p>
                        <p className="text-muted-foreground">Hosted</p>
                      </div>
                      <div className="bg-secondary/50 p-2 rounded">
                        <p className="font-semibold">
                          {userStats.hostedEvents.reduce(
                            (acc, event) =>
                              acc + (event._count?.participants || 0),
                            0
                          )}
                        </p>
                        <p className="text-muted-foreground">
                          Total Participants
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-primary/10 p-2 rounded">
                        <p className="font-semibold text-primary">
                          {userStats.joinedEvents.length}
                        </p>
                        <p className="text-muted-foreground">Joined</p>
                      </div>
                      <div className="bg-secondary/50 p-2 rounded">
                        <p className="font-semibold">
                          {
                            userStats.joinedEvents.filter(
                              (event) => event.status === "COMPLETED"
                            ).length
                          }
                        </p>
                        <p className="text-muted-foreground">Completed</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Information Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-500/10 text-green-600 px-4 py-3 rounded-md text-sm">
                  {success}
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-2">
                {/* Common Fields for All Roles */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={profileData?.name || userInfo.name}
                    required
                    disabled={isPending}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userInfo.email}
                    disabled
                    className="bg-muted"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="interests">Interests</Label>
                  <Input
                    id="interests"
                    name="interests"
                    defaultValue={
                      Array.isArray(profileData?.interests)
                        ? profileData.interests.join(", ")
                        : ""
                    }
                    placeholder="e.g. Music, Sports, Travel"
                    disabled={isPending}
                  />
                  <div className="mt-2">{renderInterestTags()}</div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input
                    id="bio"
                    name="bio"
                    defaultValue={profileData?.bio || ""}
                    disabled={isPending}
                  />
                </div>

                {/* host-Specific Fields */}
                {userInfo.role === "HOST" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="location"
                        name="location"
                        defaultValue={userInfo.location || ""}
                        disabled={isPending}
                      />
                    </div>
                  </>
                )}

                {/* user-Specific Fields */}
                {userInfo.role === "USER" && (
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="location">Address</Label>
                    <Input
                      id="location"
                      name="location"
                      defaultValue={userInfo.location || ""}
                      disabled={isPending}
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-end pt-4">
                <Button type="submit" disabled={isPending}>
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>

      {/* Events Section */}
      <div className="grid gap-6 lg:grid-cols-2">

         {/* Bio & Additional Info */}
        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className=" font-medium">Bio</Label>
              <p className="text-sm text-muted-foreground mt-1">
                {profileData?.bio || "No bio added yet"}
              </p>
            </div>

            <Separator />
             <div>
              <Label className=" font-medium">Interests</Label>
              <p className="text-sm text-muted-foreground mt-1">
                {Array.isArray(profileData?.interests) ? profileData.interests.join(", ") : "No interests added yet"}
              </p>
            </div>

            <Separator />

            <div>
              <Label className=" font-medium">Location</Label>
              <p className="text-sm text-muted-foreground mt-1">
                {profileData?.location || "No location added"}
              </p>
            </div>

            <Separator />

            <div>
              <Label className="font-medium">Member Since</Label>
              <p className="text-sm text-muted-foreground mt-1">
                {new Date().getFullYear()}
              </p>
            </div>
          </CardContent>
        </Card>
        {/* Hosted Events (for Hosts) */}
        {userInfo.role === "HOST" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                My Hosted Events ({userStats.hostedEvents.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="flex gap-3">
                        <div className="w-16 h-16 bg-muted rounded-lg"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-muted rounded w-3/4"></div>
                          <div className="h-3 bg-muted rounded w-1/2"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : userStats.hostedEvents.length > 0 ? (
                <div className="max-h-72 overflow-y-auto">
                  {userStats.hostedEvents.slice(0, 5).map(renderEventCard)}
                  {userStats.hostedEvents.length > 5 && (
                    <p className="text-sm text-muted-foreground text-center mt-2">
                      +{userStats.hostedEvents.length - 5} more events
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No hosted events yet
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Joined Events (for Users) */}
        {userInfo.role === "USER" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                My Joined Events ({userStats.joinedEvents.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="flex gap-3">
                        <div className="w-16 h-16 bg-muted rounded-lg"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-muted rounded w-3/4"></div>
                          <div className="h-3 bg-muted rounded w-1/2"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : userStats.joinedEvents.length > 0 ? (
                <div className="max-h-72 overflow-y-auto">
                  {userStats.joinedEvents.slice(0, 5).map(renderEventCard)}
                  {userStats.joinedEvents.length > 5 && (
                    <p className="text-sm text-muted-foreground text-center mt-2">
                      +{userStats.joinedEvents.length - 5} more events
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No joined events yet
                </p>
              )}
            </CardContent>
          </Card>
        )}

       
      </div>
    </div>
  );
};

export default MyProfile;
